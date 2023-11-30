/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// client/src/pages/Login.jsx
// eslint-disable eact/no-unescaped-entities
// eslint-disable no-unused-vars
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.log('error', e);
    }
  };
      const handleChange = (event) => {
        const { name, value } = event.target
        setFormState({
          ...formState,
          [name]: value,
        });
      };
  return (
         <div className="container my-1">
              <Link to="/login">User Login</Link>
              <h1>Login</h1>
              <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                <label htmlFor="email">Email:</label>
                <input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
                </div>
                <div className="flex-row space-between my-2">
                <label htmlFor="pwd">Password:</label>
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
                </div>
                {error ? (
                  <div>
                    <p className="error-text">The provided credentials are incorrect</p>
                  </div>
                ) : null}
                <div className="flex-row flex-end">
                  <a href='./Signup'>Don't have an account?</a>
                </div>
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
              </form>
          </div>
  );
}
export default Login;