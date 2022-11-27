import React from 'react';
import Routes from '../components/Routes.js';
import './App.scss';
// import NewApplication from '../components/NewApplication.jsx';
// import JobListDisplay from '../components/JobListDisplay.jsx';
// import { render } from 'sass';

// const App = (props) => {
//   return (
//     <div>
//       <NewApplication/>
//       <JobListDisplay/>
//     </div>
//   )
// }

const App = () => (
  <main className="App">
    <Routes />
  </main>
);

export default App;
