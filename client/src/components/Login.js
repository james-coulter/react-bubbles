import React, { useState } from "react";
import axiosWithAuth from '../axiosWithAuth';


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [ input, setInput ] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth().post('/api/login', input)
                   .then(res => {
                     console.log('Post req success!', res);
                     localStorage.setItem('token', res.data.payload);
                     props.history.push('/bubble-page');
                   })
                   .catch(err => {
                     console.log('Post req error', err);
                     alert('Unknown username or password.')
                   })
  }
  return (
    <div className='loginPage'>
      <h1>Welcome to the Bubble App!</h1>

          <h1>Login Here</h1>
          <form onSubmit={handleSubmit}>
            <input type='text' name='username' placeholder='username' value={input.username} onChange={handleChange} />
            <input type='password' name='password' placeholder='password' value={input.password} onChange={handleChange} />
            <button>login</button>
          </form>
    </div>
  );
};

export default Login;
