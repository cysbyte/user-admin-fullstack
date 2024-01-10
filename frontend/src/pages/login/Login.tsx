import React, { EventHandler, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './login.scss';
import * as AuthApi from '../../network/auth_api';
import { useAuthDispatch } from '../../context/AuthContext';

const Login = () => {
  const authDispatch = useAuthDispatch();

  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await AuthApi.getLoggedInUser();
        console.log(user);
        authDispatch({ type: "LOGGEDINUSER", payload: user });
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = email.current?.value;
    const passwordInput = password.current?.value;

    try {
      const credentials: AuthApi.LoginCredentials = {
        email: emailInput as string,
        password: passwordInput as string

      }
      console.log(credentials);
      const user = await AuthApi.login(credentials);
      console.log(user);

      authDispatch({ type: 'LOGIN', payload: user });
      navigate('/');

  } catch (error) {
      alert(error);
      console.log(error);
    }
    
    console.log(email.current?.value);
  };

  return (
    <div className="login">
      <div className="formWrapper">
        <span className="logo">User Dashboard</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" ref={email} autoComplete="on"/>
          <input type="password" placeholder="password" ref={password} autoComplete="on"/>
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login