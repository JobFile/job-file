import React, { useEffect, useState } from 'react';
import NewApplication from '../components/NewApplication.jsx';
import { Route, Routes } from 'react-router-dom';
// import JobListDisplay from '../components/JobListDisplay.jsx';
import Login from './Login.jsx';
import styles from '../scss/login.scss';
import Signup from './Signup.jsx';
import NewApplicationCreator from '../components/NewApplication.jsx';

const App = () => {
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
      <Routes>
        <Route exact path ='/' element={ <Login/> } />
        <Route path ='/users' element={ <Signup/>} />
        <Route path = '/users/:id' element={<NewApplication/>}/>
      </Routes>
  
    {/* {login? <NewApplication user={num}/> : <Login />}
      <Login/>
      {/* <Signup/>
      <NewApplication /> */}

   </div>
  );
};

export default App;
