import React, { Component } from 'react';
import NewApplication from '../components/NewApplication.jsx';
import JobListDisplay from '../components/JobListDisplay.jsx';
import { render } from 'sass';

const App = (props) => {
  return (
    <div>
      <NewApplication/>
      <JobListDisplay/>
    </div>
  )
}

export default App;
