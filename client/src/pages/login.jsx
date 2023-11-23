/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
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
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
              </form>
          </div>
  );
};

export default Login;
