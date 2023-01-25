import React, { useReducer, useState, useEffect } from 'react';
import { useInput } from '../hooks';
import Job from './Job.jsx';
import UpdateApplication from './UpdateApplication.jsx';
import { useParams } from 'react-router-dom';

export const ACTIONS = {
  ADD_APP: 'add-app',
  DELETE_APP: 'delete-app',
  INITIALIZE: 'initialize',
  UPDATE_APP: 'update-app',
};

export function reducer(jobList, action) {
  switch (action.type) {
    case ACTIONS.INITIALIZE:
      return [...action.payload.initialList]; // data passed in
    case ACTIONS.ADD_APP:
      console.log(action.payload.jobApp);
      return [...jobList, action.payload.jobApp];
    case ACTIONS.DELETE_APP:
      console.log('i am payload job id', action.payload.id);
      return jobList.filter((job) => job.job_id !== action.payload.id);
    case ACTIONS.UPDATE_APP:
      const newJobList = [...jobList];
      for (let job of newJobList) {
        if (job.job_id === action.payload.jobApp.job_id) {
          job = Object.assign(job, action.payload.jobApp); //action.payload.jobApp.;
        }
      }
      return newJobList;
    default:
      return jobList;
  }
}

// this function adds in a unique id to be called later when deleting app
// unique key should be handled when posting data
// function newJobApp (jobApp) {
//   jobApp.id = Date.now();
//   return jobApp;
// }

const NewApplicationCreator = ({ user }) => {
  // const { id } = useParams();
  console.log('i am id:', user);
  useEffect(() => {
    fetch(`/users/${user}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: ACTIONS.INITIALIZE, payload: { initialList: data } });
      })
      .catch(() => {
        console.log('err getting stuff');
      });
  }, [job_role, company_name, email, phone, contact_name, job_link, status]);

  const [jobList, dispatch] = useReducer(reducer, []);

  const [job_role, jobRoleOnChange, resetJobRole] = useInput('');
  const [company_name, companyNameOnChange, resetCompanyName] = useInput('');
  const [email, emailOnChange, resetEmail] = useInput('');
  const [phone, phoneNumberOnChange, resetPhone] = useInput('');
  const [contact_name, contactNameOnChange, resetContact] = useInput('');
  const [job_link, linkOnChange, resetLink] = useInput('');
  const [status, statusOnChange, resetStatus] = useInput('Pending');
  const jobApp = {
    job_role,
    company_name,
    email,
    phone,
    contact_name,
    job_link,
    status,
    user_id: user,
  };
  const createApp = (e) => {
    e.preventDefault();

    // for (const val of jobApp) {
    //   if (val === '') {
    //     window.alert('Invalid input fields');
    //     console.log('in');
    //     return;
    //   }
    // }

    console.log('entering fetch', jobApp);
    console.log('i am user id', user);
    fetch(`/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(jobApp),
    })
      .then((response) => {
        console.log(
          'my response from posting  new jobApp using user id is: ',
          response
        );
        return response.json();
      })
      .then((data) =>
        dispatch({ type: ACTIONS.ADD_APP, payload: { jobApp: data } })
      )
      .catch(() => {
        console.log('An error occurred posting to database');
      });
    //console.log('im supposed to fetch and this is my jobapp', jobApp);

    // dispatch should be moved into fetch request to avoid date.now to give unique key, payload should be the response from posting;

    // using reset functions from custom hooks to reset each state to empty => input values reset to empty
    resetJobRole();
    resetCompanyName();
    resetEmail();
    resetPhone();
    resetContact();
    resetLink();
    resetStatus();
  };

  console.log('this is jobList ', jobList);
  const body = document.querySelector('body');
  body.style.backgroundColor = 'lightgrey';

  return (
    <div>
      <div id='updateDiv'></div>
      <div className='newApplication'>
        <h2 id='newApp'>Please enter job application desription below:</h2>
        <form>
          <input
            className='newApp-Field'
            type='text'
            id='jobRole'
            name='jobRole'
            placeholder='Job Role'
            value={job_role}
            onChange={jobRoleOnChange}
          />
          <input
            className='newApp-Field'
            type='text'
            id='companyName'
            name='companyName'
            placeholder='Company Name'
            value={company_name}
            onChange={companyNameOnChange}
          />
          <input
            className='newApp-Field'
            type='text'
            id='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={emailOnChange}
          />
          <input
            className='newApp-Field'
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            placeholder='Phone Number'
            value={phone}
            onChange={phoneNumberOnChange}
          />
          <input
            className='newApp-Field'
            type='text'
            id='contactName'
            name='contactName'
            placeholder='Contact Name'
            value={contact_name}
            onChange={contactNameOnChange}
          />
          <input
            className='newApp-Field'
            type='text'
            id='link'
            name='link'
            placeholder='Job Posting URL'
            value={job_link}
            onChange={linkOnChange}
          />
          <select
            className='newApp-Field'
            name='status'
            id='status'
            value={status}
            onChange={statusOnChange}
          >
            <option value='Pending'>Pending</option>
            <option value='Accepted'>Accepted</option>
            <option value='Rejected'>Rejected</option>
          </select>
          <button
            className='button'
            id='createApp'
            type='submit'
            onClick={createApp}
          >
            Create Application
          </button>
        </form>
      </div>
      <table id='jobTable'>
        <thead id='tableHead'>
          <tr>
            <th>JOB ROLE</th>
            <th>COMPANY NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>CONTACT NAME</th>
            <th>URL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {jobList.map((job) => {
            console.log('i am the key', job.job_id);
            return <Job key={job.job_id} job={job} dispatch={dispatch} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default NewApplicationCreator;
