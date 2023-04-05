import { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import LoginForm from '@/components/LoginForm';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/router';

const Login: NextPage = () => {

  const [isLogin, setIsLogin] = useState(true);
  const { setCurrentUser } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    const setUserAsync = async () => {

      if (process.env.NEXT_PUBLIC_LOCALHOST_KEY && localStorage.getItem(process.env.NEXT_PUBLIC_LOCALHOST_KEY)) {
        setCurrentUser(
          await JSON.parse(
            //@ts-ignore
            localStorage.getItem(process.env.NEXT_PUBLIC_LOCALHOST_KEY)
          )
        );
      }
    }
    setUserAsync();

  }, []);

  function handleChildData(data: boolean) {
    setIsLogin(data);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h3 className="pt-16 py-10 text-cener">{isLogin ? 'Sign In' : 'Create An Account'}</h3>
      <LoginForm onChildData={handleChildData} />
    </div>
  );
};

export default Login;
