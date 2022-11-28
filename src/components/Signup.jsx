import React from 'react';
import { useInput } from '../hooks';

const Signup = (props) => {
  const [firstName, fNameOnChange] = useInput('');
  const [lastName, lNameOnChange] = useInput('');
  const [email, emailOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');
  const newUser = { firstName, lastName, email, password };
  const createAccount = () => {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        console.log(response);
        // once user is created we should grab id and user should be redirected to dashboard
      });
  };
  return (
    <div id="signup">
      <h2 id="signUpTitle">Sign up</h2>
      <div className='fieldDiv'>
        <input className="signUp-Field" name="firstName" type="text" placeholder="First Name" value={firstName} onChange={fNameOnChange}/>
        <input className="signUp-Field" name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={lNameOnChange}/>
        <input className="signUp-Field" name="email" type="email" placeholder="Email" value={email} onChange={emailOnChange}/>
        <input className="signUp-Field" name="password" type="password" placeholder="Password" value={password} onChange={passwordOnChange}/>
      </div>
      <div className='button-container'>
        <button className="button" onClick={createAccount}>Create Account</button>
      </div>
    </div>
  );
};

export default Signup;
