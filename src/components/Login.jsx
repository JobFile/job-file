import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const [email, emailOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');

  const sendLogin = () => {
    console.log(email, password);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        // if response comes back with verified, save id. else redirect to sign up?
        // how is id sent back?
        console.log('i am login reponse', response);
        return response.json();
        
      })
      .then((data) => {
        if (data.userID) {
          let user = data.userID;
          setUser(user);
          navigate(`/users/${user}`);
        } else {
          navigate('/users');
        }
      })
      .catch(() => {
        navigate('/login');
      });
   
  };

  return (
    <div id="login">
      <h2>Login</h2>
      <div>
        <input className="login-Field" name="email" type="email" placeholder="email" value={email} onChange={emailOnChange}></input>
        <input className="login-Field" name="password" type="password" placeholder="password" value={password} onChange={passwordOnChange}></input>
      </div>
      <div>
        <button className="buttton" onClick={sendLogin}>Login</button>
        <button className="buttton" onClick={() => navigate('/users')}> Sign up</button>
      </div>
    </div>
  );
};

export default Login;
