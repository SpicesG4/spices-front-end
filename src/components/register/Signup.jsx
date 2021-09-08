import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { FormGroup, InputGroup, Button, Card, Label } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import "./signup.css"



function Signup(props) {

  const { signup } = useContext(AuthContext);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('chef');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      // console.log(e.target.value);
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      // console.log(e.target.value);
      setPassword(e.target.value);
    } else if (e.target.name === 'email') {
      // console.log(e.target.value);
      setEmail(e.target.value);
    }

    else {
      console.log(e.target.value);
      setRole(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password, role, email);
  };

  return (
    <>
      <div className="body" >
      <div className="wrap">
      <div className="loginLeft">
          <h3 className="loginLogo">Spices</h3>
          <h4 className="loginDesc">
          Let food be the medicine and medicine be the food
          </h4>
          <h4 className="loginDesc">
          Join our website.
          </h4>
        </div>
        <div className="form-box">
          <div className="header-text">
            Signup
          </div>
          <input placeholder="Your Email Address" onChange={handleChange}
            name="email"
            required type="email" />
          <input onChange={handleChange} name="username" required
            type="text" placeholder="Your Name" />
          <input placeholder="Your Password" onChange={handleChange}
            name="password"
            required
            type="password" />

         
          <input id="terms" type="checkbox" />
          <label for="terms"></label>
          <span>Agree with <a href="#">Terms & Conditions</a>
          </span>
          <button onClick={handleSubmit} >signup</button>
          <Link to="/signin" style={{ textDecoration: "none", color: "white" }}>
            <button >signin</button>
          </Link>
        </div>
</div>
      </div>
    </>
  );
}

export default Signup;