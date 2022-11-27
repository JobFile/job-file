import React from 'react';

import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';
/* Formik - helps you to write the three most annoying parts of building a form: Getting values in and out of form state. Validation and error messages. Handling form submission. Yup and Formik are both packages that can be installed into a React application. Formik is built specifically to work with React, but Yup can be used with any front-end framework.
Formik is a form-building library. It provides you with out-of-the-box React form elements that can be quickly added to your React app. It takes care of the boilerplate, and automates the repetitive tasks of form-building, like error handling, validation, and visited/required fields.
*/

import axios from 'axios';
// axios - is an HTTP client library based on promises. It makes sending asynchronous HTTP requests to REST endpoints easier and helps you perform CRUD operations. This REST endpoint/API could be an external API like the Google API, GitHub API, and so on – or it could be your own backend Node. js server. Axios is more secure than fetch

import { history } from '../../history';
// history - lets you easily manage session history anywhere JavaScript runs. A history object abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, and persist state between sessions.

import './Login.scss';

const Login = () => {
  // is triggered ny clickin on login button
  const handleSubmit = (values) => {
    axios
      .post('http://localhost:8080/v1/api/auth', values)
      // The v1 in a URL of API REST stands for "version 1" and is used to indicate that this is the first version of the API. This helps to distinguish between different versions of the API and helps to keep track of changes.
      .then((response) => {
        const { data } = response;
        if (data) {
          // if login is successful then saving token in the storage and use it in PrivateRoute
          localStorage.setItem('app-token', data);
          history.push('/dashboard');
        } else {
          // if login failed going back to the login page
          history.push('/login');
        }
      });
  };
  // validating the format of the password and email
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  });

  return (
    <>
      <h1>Login</h1>
      <p>Fill the fields to continue</p>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Login">
          <div className="Login-Group">
            <Field name="email" className="Login-Field" />
            <ErrorMessage
              component="span"
              name="email"
              className="Login-Error"
            />
          </div>
          <div className="Login-Group">
            <Field name="password" className="Login-Field" />
            <ErrorMessage
              component="span"
              name="password"
              className="Login-Error"
            />
          </div>
          <button className="Login-Btn" type="submit">
            Login
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
