import React, { useState } from 'react';
import { ACTIONS } from './NewApplication.jsx';
// PROPS.JOB = JOB

export default function Job ({ job, dispatch }) {
  const deleteApp = () => {
    // when this button is click, the application needs to be removed from the user's jobList in database
    // also needs to be removed from table
    dispatch({ type: ACTIONS.DELETE_APP, payload: { id: job.id } });
    fetch('/jobs/:id', {
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
    </tr>
  );
};
