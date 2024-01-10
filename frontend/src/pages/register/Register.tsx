import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.scss";
import * as AuthApi from '../../network/auth_api';

const Register = () => {
  const email = useRef<HTMLInputElement | null>(null);
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameInput = username.current?.value;
    const emailInput = email.current?.value;
    const passwordInput = password.current?.value;

    try {
      const credentials: AuthApi.SignUpCredentials = {
        username: usernameInput as string,
        email: emailInput as string,
        password: passwordInput as string

      }
      console.log(credentials);
      const newUser = await AuthApi.signUp(credentials);
      console.log(newUser);
      navigate('/');

  } catch (error) {
      alert(error);
      console.log(error);
    }
    
    console.log(email.current?.value);
  };

  return (
    <div className="register">
      <div className="formWrapper">
        <span className="logo">User Dashboard</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" ref={username} />
          <input required type="email" placeholder="email" ref={email} />
          <input
            required
            type="password"
            placeholder="password"
            ref={password}
          />

          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
