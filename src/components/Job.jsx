import React, { useState } from 'react';
import { render } from 'react-dom';
import { ACTIONS } from './NewApplication.jsx';
import { useInput } from '../hooks.js';
import UpdateApplication from './UpdateApplication.jsx';
// import { Navigate, useNavigate } from 'react-router-dom';
// PROPS.JOB = JOB

export default function Job({ job, dispatch }) {
  const [status, statusOnChange, resetStatus] = useInput('');

  const deleteApp = () => {
    // when this button is click, the application needs to be removed from the user's jobList in database
    // also needs to be removed from table
    dispatch({ type: ACTIONS.DELETE_APP, payload: { id: job.job_id } });
    fetch(`/jobs/${job.job_id}`, {
      method: 'DELETE',
    }).then((response) => console.log(response));
  };

  function renderUpdateBox(job) {
    // render the update application div
    document.getElementById('jobTable').style.pointerEvents = 'none';
    render(
      <UpdateApplication job={job} dispatch={dispatch} />,
      document.getElementById('updateDiv')
    );
  }

  console.log(job);

  return (
    <tr>
      <td>{job.job_role}</td>
      <td>{job.company_name}</td>
      <td>{job.email}</td>
      <td>{job.phone}</td>
      <td>{job.contact_name}</td>
      <td>{job.job_link}</td>
      <td>{job.status}</td>
      <td>
        <button className='update-button' onClick={() => renderUpdateBox(job)}>
          Update Application
        </button>
      </td>
      <td>
        <button className='delete-button' onClick={deleteApp}>
          Delete
        </button>
      </td>
    </tr>
  );
}
