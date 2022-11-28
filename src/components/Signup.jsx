import React from 'react';
import { useInput } from '../hooks';

const Signup = (props) => {
  const [firstName, fNameOnChange] = useInput('');
  const [lastName, lNameOnChange] = useInput('');
  const [email, emailOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');
  const newUser = { firstName, lastName, email, password };
  const createAccount = () => {
    fetch.post('/signup', {
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
    <div>
      <h3>Sign up</h3>
      <div>
        <input name="firstName" type="text" placeholder="first name" value={firstName} onChange={fNameOnChange}/>
        <input name="lastName" type="text" placeholder="last name" value={lastName} onChange={lNameOnChange}/>
        <input name="email" type="email" value={email} onChange={emailOnChange}/>
        <input name="password" type="password" value={password} onChange={passwordOnChange}/>
        <button onClick={createAccount}>Create Account</button>
      </div>
    </div>
  );
};

export default Signup;
