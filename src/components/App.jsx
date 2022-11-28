import React, { useState } from 'react';
import NewApplication from '../components/NewApplication.jsx';
//import JobListDisplay from '../components/JobListDisplay.jsx';
import Login from './Login.jsx';
import styles from '../scss/login.scss';
import Signup from './Signup.jsx';




const App = (props) => {
 // const [login, setLogin] = useState(false);

  return (
    <div>
      {/* <NewApplication/>, */}
      <Login/>
      <NewApplication/>

    </div>
  )
}

export default App;

