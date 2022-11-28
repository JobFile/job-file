import React, { useEffect, useState } from 'react';
import NewApplication from '../components/NewApplication.jsx';
// import JobListDisplay from '../components/JobListDisplay.jsx';
import Login from './Login.jsx';
import styles from '../scss/login.scss';
import Signup from './Signup.jsx';

const App = (props) => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch('/dashboard')
  //     .then(response => response.json()
  //     )
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch(() => {
  //       setData([]);
  //     });
  // }, []);
  const [state, setState] = useState(false);

  return (
    <div>
      {/* {login? <NewApplication user={num}/> : <Login />} */}
      <Login/>
      <NewApplication />

    </div>
  );
};

export default App;
