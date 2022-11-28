import React, { useEffect, useState } from 'react';
import NewApplication from '../components/NewApplication.jsx';
import { Route, Routes } from 'react-router-dom';
// import JobListDisplay from '../components/JobListDisplay.jsx';
import Login from './Login.jsx';
import styles from '../scss/login.scss';
import Signup from './Signup.jsx';
import NewApplicationCreator from '../components/NewApplication.jsx';
import NotFound from './NotFound.js';

const App = () => {
  const [user, setUser] = useState('');
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

  return (
    <div>
      <Routes>
        <Route exact path ='/' element={ <Login setUser={setUser}/> } />
        <Route path ='/users' element={ <Signup/>} />
        <Route path = '/users/:id' element={<NewApplication user={user}/>}/>
        <Route path = '*' element={<NotFound/>}/>
        
      </Routes>
  
    {/* {login? <NewApplication user={num}/> : <Login />}
      <Login/>
      {/* <Signup/>
      <NewApplication /> */}

   </div>
  );
};

export default App;
