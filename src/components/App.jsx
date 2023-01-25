import React, { useEffect, useState } from 'react';
import NewApplication from '../components/NewApplication.jsx';
import { Route, Routes } from 'react-router-dom';
// import JobListDisplay from '../components/JobListDisplay.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NewApplicationCreator from '../components/NewApplication.jsx';
import NotFound from './NotFound.js';
import UpdateApplication from './UpdateApplication.jsx'

const App = () => {
  const [user, setUser] = useState('');

  return (
    <div>
      <Routes>
        <Route exact path ='/' element={ <Login setUser={setUser}/> } />
        <Route path ='/users' element={ <Signup/>} />
        <Route path = '/users/:id' element={<NewApplication user={user}/>}/>
        <Route path = '*' element={<NotFound/>}/>
      </Routes>
   </div>
  );
};

export default App;
