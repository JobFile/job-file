import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = (props) => {
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
        console.log('i am login reponse',response);
        
      })
      // .then((data) => {
      //   console.log('i am login data', data);
      //   let user = data.userID;
      //   console.log('i am response from login', data);
      //   navigate(`/dashboard/${user}`);
      // })
      .catch(() => {
        console.log('could not get response from fetching user');
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
        <button className="buttton" onClick={() => navigate('/signup')}> Sign up</button>
      </div>
    </div>
  );
};

export default Login;
