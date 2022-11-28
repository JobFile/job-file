import React, { useState } from 'react';
import { ACTIONS } from './NewApplication.jsx';
import { useInput } from '../hooks.js'
// PROPS.JOB = JOB

export default function Job ({ job, dispatch }) {
  const [status, statusOnChange, resetStatus] = useInput('');

  const updateStatus = () => {
    fetch(`/jobs/${job.job_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({newStatus: status})
    })
    .then(response => response.json())
    .then(data => {
      // data get back is object of job details
      // call dispatch
      dispatch({type:ACTIONS.UPDATE_STATUS, payload: { newStatus: data.status, id: job.job_id}})
    })
    .catch(()=>console.log('couldnt fetch patch request'));
    resetStatus();
  }

  const deleteApp = () => {
    // when this button is click, the application needs to be removed from the user's jobList in database
    // also needs to be removed from table
    dispatch({ type: ACTIONS.DELETE_APP, payload: { id: job.job_id } });
    fetch(`/jobs/${job.job_id}`, {
      method: 'DELETE'
    })
      .then(response => console.log(response));
  };

  return (
    <tr>
      <td>{job.job_role}</td>
      <td>{job.company_name}</td>
      <td>{job.email}</td>
      <td>{job.phone}</td>
      <td>{job.contact_name}</td>
      <td>{job.job_link}</td>
      <td>{job.status}</td>
      <td><button onClick={deleteApp}>Delete</button></td>
      <td>
        <input type="text" id="status" name="status" placeholder="status" value={status} onChange={statusOnChange} />
        <button onClick={updateStatus}>submit status</button>
      </td>
    </tr>
  );
};
