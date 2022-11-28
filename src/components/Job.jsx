import React, { useState } from 'react';
import { ACTIONS } from './NewApplication.jsx'

export default function Job ({ job, dispatch }) {
  const deleteApp = () => {
    // when this button is click, the application needs to be removed from the user's jobList in database
    // also needs to be removed from table
    dispatch({ type: ACTIONS.DELETE_APP, payload: { id: job.id } });
    fetch('/endpoint', {
      method: 'DELETE'
    })
      .then(response => console.log(response));
  };

  return (
    <tr>
      <td>{job.jobRole}</td>
      <td>{job.companyName}</td>
      <td>{job.email}</td>
      <td>{job.phoneNumber}</td>
      <td>{job.contactName}</td>
      <td>{job.link}</td>
      <td>{job.status}</td>
      <td><button onClick={deleteApp}>Delete</button></td>
    </tr>
  );
};
