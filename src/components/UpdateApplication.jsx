import React, { useReducer, useState, useEffect } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { ACTIONS } from './NewApplication.jsx';
import { useInput } from '../hooks.js';
import reducer from './NewApplication.jsx';

export default function UpdateApplication({ job, dispatch }) {
  const [job_role, jobRoleOnChange, resetJobRole] = useInput(job.job_role);
  const [company_name, companyNameOnChange, resetCompanyName] = useInput(
    job.company_name
  );
  const [email, emailOnChange, resetEmail] = useInput(job.email);
  const [phone, phoneNumberOnChange, resetPhone] = useInput(job.phone);
  const [contact_name, contactNameOnChange, resetContact] = useInput(
    job.contact_name
  );
  const [job_link, linkOnChange, resetLink] = useInput(job.job_link);
  const [status, statusOnChange, resetStatus] = useInput(job.status);
  const jobApp = {
    job_role,
    company_name,
    email,
    phone,
    contact_name,
    job_link,
    status,
  };

  const updateApp = (e) => {
    e.preventDefault();

    // console.log('entering update req');
    fetch(`/jobs/` + job.job_id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(jobApp),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        // update state via dispatch function so that the update renders upon server response
        dispatch({ type: ACTIONS.UPDATE_APP, payload: { jobApp: data } })
      )
      .catch(() => {
        console.log('An error occurred posting to database');
      });

    // unmount the component
    document.getElementById('jobTable').style.pointerEvents = 'auto';
    unmountComponentAtNode(document.getElementById('updateDiv'));
  };

  return (
    <div className='update-application'>
      <h2 id='updateApp'>
        Please edit your job application description below:
      </h2>
      <form>
        <input
          className='updateApp-Field'
          type='text'
          id='newjobRole'
          name='jobRole'
          placeholder='Job Role'
          value={job_role}
          onChange={jobRoleOnChange}
        />
        <input
          className='updateApp-Field'
          type='text'
          id='newcompanyName'
          name='companyName'
          placeholder='Company Name'
          value={company_name}
          onChange={companyNameOnChange}
        />
        <input
          className='updateApp-Field'
          type='text'
          id='newemail'
          name='email'
          placeholder='Email'
          value={email}
          onChange={emailOnChange}
        />
        <input
          className='updateApp-Field'
          type='text'
          id='newphoneNumber'
          name='phoneNumber'
          placeholder='Phone Number'
          value={phone}
          onChange={phoneNumberOnChange}
        />
        <input
          className='updateApp-Field'
          type='text'
          id='newcontactName'
          name='contactName'
          placeholder='Contact Name'
          value={contact_name}
          onChange={contactNameOnChange}
        />
        <input
          className='updateApp-Field'
          type='text'
          id='newlink'
          name='link'
          placeholder='Job Posting URL'
          value={job_link}
          onChange={linkOnChange}
        />
        <select
          className='updateApp-Field'
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
          onClick={updateApp}
        >
          Submit Update
        </button>
        <button
          className='button delete-button'
          id='cancelApp'
          type='submit'
          onClick={() => {
            document.getElementById('jobTable').style.pointerEvents = 'auto';
            unmountComponentAtNode(document.getElementById('updateDiv'));
          }}
        >
          Cancel Update
        </button>
      </form>
    </div>
  );
}
