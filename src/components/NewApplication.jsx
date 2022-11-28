import React, { useReducer, useState, useEffect } from 'react';
import { useInput } from '../hooks';

const ACTIONS = {
  ADD_APP: 'add-app',
  DELETE_APP: 'delete-ap'
};

function reducer (jobList, action) {
  switch (action.type) {
    case ACTIONS.ADD_APP:
      console.log(action.payload);
      return [...jobList, action.payload];
  }
};

const NewApplicationCreator = (props) => {
  const [ jobList, dispatch ] = useReducer(reducer, []);


  const [jobRole, jobRoleOnChange] = useInput('');
  const [companyName, companyNameOnChange] = useInput('');
  const [email, emailOnChange] = useInput('');
  const [phoneNumber, phoneNumberOnChange] = useInput('');
  const [contactName, contactNameOnChange] = useInput('');
  const [link, linkOnChange] = useInput('');
  const [status, statusOnChange] = useInput('');
  const jobApp = {
    jobRole,
    companyName,
    email,
    phoneNumber,
    contactName,
    link,
    status
  };
  const createApp = (e) => {
    e.preventDefault();
    console.log('im here');

    // console.log('entering fetch', jobApp);
    // fetch('/dashboard/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'Application/JSON'
    //   },
    //   body: JSON.stringify(jobApp)
    // })
    //   .then(response => {
    //     console.log('my response from posting  new jobApp ', response);
    //   })
    //   .catch(() => {
    //     console.log('An error occurred posting to database');
    //   });
    console.log('im supposed to fetch and this is my jobapp', jobApp);
   
    
    // rest values to empty
    dispatch({ type: ACTIONS.ADD_APP, payload: jobApp });
    const inputs = document.querySelectorAll(`
      #jobRole,
      #companyName,
      #email,
      #phoneNumber,
      #contactName,
      #link,
      #status
      `);
      
      inputs.forEach(input => {
        input.value = '';
    });
  };

  console.log('this is jobList ', jobList);
  return (
      <div>
        <div className="newApplication">
          <h2 id="newApp">Please enter job application desription below:</h2>
          <form>
            <input className="newApp-Field" type="text" id="jobRole" name="jobRole" placeholder="Job Role" value={jobRole} onChange={jobRoleOnChange} />
            <input className="newApp-Field" type="text" id="companyName" name="companyName" placeholder="Company Name" value={companyName} onChange={companyNameOnChange} />
            <input className="newApp-Field" type="text" id="email" name="email" placeholder="jane.doe@google.com" value={email} onChange={emailOnChange} />
            <input className="newApp-Field" type="text" id="phoneNumber" name="phoneNumber" placeholder="xxx-xxx-xxxx" value={phoneNumber} onChange={phoneNumberOnChange} />
            <input className="newApp-Field" type="text" id="contactName" name="contactName" placeholder="Contact Name" value={contactName} onChange={contactNameOnChange} />
            <input className="newApp-Field" type="text" id="link" name="link" placeholder="Job Posting URL" value={link} onChange={linkOnChange} />
            <input className="newApp-Field" type="text" id="status" name="status" placeholder="Current Status" value={status} onChange={statusOnChange} />
            <button className="buttton" id="createApp" type="submit" onClick={createApp}>Create Application</button>
          </form>
        </div>
      </div>
  );
};
export default NewApplicationCreator;
