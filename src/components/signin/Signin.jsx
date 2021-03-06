import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { FormGroup, InputGroup, Button, Card, Label } from "@blueprintjs/core";
import "./signin.css"
import { Link ,Redirect} from "react-router-dom";


function Signin() {
  const { loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const contextType = AuthContext

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
  }

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
            Signin 
          </div>
          <input placeholder="Your Email Address" onChange={handleChange}
            name="email"
            required type="email" />
          <input placeholder="Your Password" onChange={handleChange}
            name="password"
            required
            type="password" />

          <button onClick={handleSubmit} >signin</button>
       {loggedIn && <Redirect to="/" />}
        <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
          <button >signup</button>
        </Link>
         </div>
         </div>
      </div>
    </>
  )
}

export default Signin
