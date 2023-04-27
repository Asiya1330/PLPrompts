import Link from 'next/link';
import { useForm } from 'react-hook-form';
import clsx from 'classnames';
import { useState, useEffect, useContext } from 'react';
import Icon from '@/components/Icon';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { loginRoute, registerRoute } from '../utils/apis'
import { useSession, signIn, signOut } from 'next-auth/react'

export type FormData = {
  username: string;
  email: string;
  password: string;
};
export interface LoginFormProps {
  onChildData: (data: boolean) => void;
  onSuccess?: () => void;
}

const LoginForm = ({ onChildData, onSuccess }: LoginFormProps) => {
  const { setCurrentUser } = useContext(UserContext);
  const { data: session } = useSession();
  console.log(session);

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (userInfo) => {
    try {
      if (isLogin) {
        const { email, password } = userInfo;
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });

        if (!data.status) throw new Error(data.msg);
        setCurrentUser(data.user);
        if (process.env.NEXT_PUBLIC_LOCALHOST_KEY)
          localStorage.setItem(
            process.env.NEXT_PUBLIC_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );

        if (onSuccess) {
          setCurrentUser(data.user);
          onSuccess();
          return;
        }
        if (router.query.redirectUrl) {
          setCurrentUser(data.user);
          router.push(router.query.redirectUrl as string);
        } else {
          setCurrentUser(data.user);
          router.push('/marketplace');
        }
      } else {
        const { username, email, password } = userInfo;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        if (!data.status) throw data.msg;

        setIsLogin(true);
        if (process.env.NEXT_PUBLIC_LOCALHOST_KEY)
          localStorage.setItem(
            process.env.NEXT_PUBLIC_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
        setCurrentUser(data.user);
      }
    } catch (e) {
      console.log('SOME ERROR HAPPENED', e);
      alert(e)
    }
  });

  const signWithGoogle = (e: any) => {
    e.preventDefault();
    localStorage.setItem(
      //@ts-ignore
      process.env.NEXT_PUBLIC_LOCALHOST_KEY,
      null
    );

    signIn()
  };

  useEffect(() => {
    onChildData(isLogin);
  }, [isLogin, onChildData]);

  return (
    <form
      className="flex flex-col w-full bg-[#FFFFFF1A] rounded-lg mb-40 min-w-[470px] max-w-[470px] mx-auto"
      onSubmit={onSubmit}
    >
      <div className="w-full justify-between items-center text-center flex flex-row border-b-[0.5px] border-[#FFFFFF66] mb-10">
        <div
          className={clsx('w-1/2 px-4 py-5 cursor-pointer', {
            'bg-green rounded-tl-lg text-black': isLogin === true,
          })}
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Sign in
        </div>
        <div
          className={clsx('w-1/2 px-4 py-5 cursor-pointer', {
            'bg-green rounded-tr-lg text-black': isLogin === false,
          })}
          onClick={() => setIsLogin(false)}
        >
          Register
        </div>
      </div>
      <div className="px-8">
        {isLogin !== true && (
          <div className="flex flex-col gap-y-2">
            <label>Name</label>
            <input className="login-input mb-4 focus:outline-none focus:shadow-outline " {...register('username')} />
          </div>
        )}
        <div className="flex flex-col gap-y-2">
          <label>E-mail*</label>
          <input className="login-input mb-4 focus:outline-none focus:shadow-outline " {...register('email')} />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Password</label>
          <input
            className="login-input focus:outline-none focus:shadow-outline"
            type="password"
            {...register('password')}
          />
        </div>
        {isLogin ? (
          <label className="text-sm">Forgot password?</label>
        ) : (
          <div className="flex gap-2 text-sm">
            <input type="checkbox"></input>
            <label>
              I agree with <span className="text-[#0B88D9]">Terms</span> and{' '}
              <span className="text-[#0B88D9]">Privacy</span>
            </label>
          </div>
        )}
        <button
          className="w-full bg-yellow hover:bg-green text-black font-bold py-3 px-4 rounded-full mt-10"
          type="submit"
          onClick={() => console.log('heheh')
          }
        >
          {isLogin ? 'Log In' : 'Register'}
        </button>
        {isLogin ? (
          <label className="text-center justify-center text-sm flex pt-4">
            {"Don't have an account?"}
            <Link href={'/'} className="text-[#0B88D9]">
              &nbsp;Create account
            </Link>
          </label>
        ) : (
          <label className="text-center justify-center text-sm flex pt-4">
            Already have an account?
            <Link href={'/'} className="text-[#0B88D9]">
              &nbsp;Log in
            </Link>
          </label>
        )}
        <br />
        <label className="text-center justify-center text-sm flex py-2">OR</label>
        <button
          className="flex w-full bg-[#FFFFFF2A] hover:bg-green py-3 px-4 rounded-lg text-sm mb-8"
          type="submit"
          onClick={signWithGoogle}
        >
          <div className="flex flex-row gap-3 jutify-center items-center mx-auto">
            <Icon>google</Icon>
            <span>Continue with Google</span>
          </div>
        </button>
      </div>
    </form>
  );
};
export default LoginForm;
