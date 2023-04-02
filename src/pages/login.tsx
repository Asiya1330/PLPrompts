import { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import LoginForm from '@/components/LoginForm';
import { UserContext } from '@/contexts/UserContext';

const Login: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  function handleChildData(data: boolean) {
    setIsLogin(data);
  }
  const { currentUser } = useContext(UserContext);
  console.log(currentUser, 'hehe got ya');

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h3 className="pt-16 py-10 text-cener">{isLogin ? 'Sign In' : 'Create An Account'}</h3>
      <LoginForm onChildData={handleChildData} />
    </div>
  );
};

export default Login;
