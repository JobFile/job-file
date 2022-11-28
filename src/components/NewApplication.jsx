import React, { useReducer, useState, useEffect } from 'react';
import { useInput } from '../hooks';
import Job from './Job.jsx';
import { useParams } from 'react-router-dom';

export const ACTIONS = {
  ADD_APP: 'add-app',
  DELETE_APP: 'delete-ap',
  INITIALIZE: 'initialize'
};

function reducer (jobList, action) {
  switch (action.type) {
    case ACTIONS.INITIALIZE:
      return [...action.payload.initialList];
    case ACTIONS.ADD_APP:
      console.log(action.payload.jobApp);
      return [...jobList, newJobApp(action.payload.jobApp)];
    case ACTIONS.DELETE_APP:
      console.log('i am payload job id', action.payload.id);
      return jobList.filter(job => job.id !== action.payload.id);
    default:
      return jobList;
  }
};

// this function adds in a unique id to be called later when deleting app
// unique key should be handled when posting data
function newJobApp (jobApp) {
  jobApp.id = Date.now();
  return jobApp;
}

const NewApplicationCreator = () => {
  const { id } = useParams();
  console.log ('i am id:', id);
  useEffect(() => {
    fetch(`/dashboard/${id}`)
      .then(response => response.json()
      )
      .then((data) => {
        // console.log(data);
        // unique key
        data.forEach(app => {
          app.id = app.job_id;
          // console.log("hello",app)
        });
        dispatch({ type: ACTIONS.INITIALIZE, payload: { initialList: data } });
      })
      .catch(() => {
        console.log('err getting stuff');
      });
  }, []);
  // console.log('this is my data', data);

  const [jobList, dispatch] = useReducer(reducer, []);

  const [job_role, jobRoleOnChange, resetJobRole] = useInput('');
  const [company_name, companyNameOnChange, resetCompanyName] = useInput('');
  const [email, emailOnChange, resetEmail] = useInput('');
  const [phone, phoneNumberOnChange, resetPhone] = useInput('');
  const [contact_name, contactNameOnChange, resetContact] = useInput('');
  const [job_link, linkOnChange, resetLink] = useInput('');
  const [status, statusOnChange, resetStatus] = useInput('');
  const jobApp = {
    job_role,
    company_name,
    email,
    phone,
    contact_name,
    job_link,
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

    // dispatch should be moved into fetch request to avoid date.now to give unique key, payload should be the response from posting;
    dispatch({ type: ACTIONS.ADD_APP, payload: { jobApp } });

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
  return (
      <div>
        <div className="newApplication">
          <h2 id="newApp">Please enter job application desription below:</h2>
          <form>
            <input className="newApp-Field" type="text" id="jobRole" name="jobRole" placeholder="Job Role" value={job_role} onChange={jobRoleOnChange} />
            <input className="newApp-Field" type="text" id="companyName" name="companyName" placeholder="Company Name" value={company_name} onChange={companyNameOnChange} />
            <input className="newApp-Field" type="text" id="email" name="email" placeholder="Email" value={email} onChange={emailOnChange} />
            <input className="newApp-Field" type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={phone} onChange={phoneNumberOnChange} />
            <input className="newApp-Field" type="text" id="contactName" name="contactName" placeholder="Contact Name" value={contact_name} onChange={contactNameOnChange} />
            <input className="newApp-Field" type="text" id="link" name="link" placeholder="Job Posting URL" value={job_link} onChange={linkOnChange} />
            <input className="newApp-Field" type="text" id="status" name="status" placeholder="Current Status" value={status} onChange={statusOnChange} />
            <button className="buttton" id="createApp" type="submit" onClick={createApp}>Create Application</button>
          </form>
        </div>
          <table id="jobTable">
            <thead id="tableHead">
              <tr>
                <th>Job Role</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Contact Name</th>
                <th>Link to Job Posting</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobList.map(job => {
                console.log('i am the key', job.id);
                return <Job key={job.id} job={job} dispatch={dispatch}/>;
              })}

            </tbody>
          </table>

      </div>
  );
};
export default NewApplicationCreator;
