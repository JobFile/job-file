import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, emailOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');

  const sendLogin = () => {
    console.log(email, password);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        // if response comes back with verified, save id. else redirect to sign up?
        // how is id sent back?
        console.log('i am login response', response);
        return response.json();
      })
      .then((data) => {
        if (data.userID) {
          console.log(data.userID);
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

  const checkCookie = async () => {
    let response = await fetch('/login', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.status === 200) {
      let userID = await response.json();
      // console.log(userID);
      setUser(userID);
      navigate(`/users/${userID}`);
    } else {
      return;
    }
    // .then((response) => {
    //   // if (response.status === 200) {
    //   //   console.log('response is: ', response.json());
    //   //   return response.json();
    //   // }
    //   // else {
    //   //   return;
    //   // }

    //   response.json();
    // })
    // .then((data) => {
    //   console.log('data is: ', data);
    //   const user = data.userID;
    //   setUser(user);
    //   navigate(`/users/${user}`);
    // });
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <div id='login'>
      <h2>Login to track your job applications!</h2>
      <div className='fieldDiv'>
        <input
          className='login-Field'
          name='email'
          type='email'
          placeholder='email'
          value={email}
          onChange={emailOnChange}
        ></input>
        <input
          className='login-Field'
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={passwordOnChange}
        ></input>
      </div>
      <div className='button-container'>
        <button className='button' onClick={sendLogin}>
          Login
        </button>
        <button className='button' onClick={() => navigate('/users')}>
          {' '}
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
