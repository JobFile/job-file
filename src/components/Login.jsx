import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks';

const Login = (props) => {
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
        props.id = response.id;
        console.log(response);
      });
  };

  const redirect = () => {
    console.log('redirect to sign up');
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
        <button className="buttton" onClick={redirect}> Sign up</button>
      </div>
    </div>
  );
};

export default Login;
