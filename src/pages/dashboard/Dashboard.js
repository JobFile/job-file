import React from 'react';

import './dashboard.scss';

import NewApplication from '../components/NewApplication.jsx';
import JobListDisplay from '../components/JobListDisplay.jsx';

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <NewApplication/>
      <JobListDisplay/>
    </div>
  );
};

export default Dashboard;
