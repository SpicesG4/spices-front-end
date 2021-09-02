import React, { Component, useState, useContext } from 'react'
import { AuthContext } from '../context/auth';
import { Card, Button, Icon, Label } from "@blueprintjs/core";
import { If, Else, Then } from 'react-if';




function Login(props) {
  const { loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const contextType = AuthContext

  const handleChange = (e) => {
    // if (e.target.name === 'username') {
    //   console.log(e.target.value);
    //   setUsername(e.target.value);
    // } else 
    if (e.target.name === 'password') {
      console.log(e.target.value);
      setPassword(e.target.value);
    } else if (e.target.name === 'email') {
      console.log(e.target.value);
      setEmail(e.target.value);
    }
  };
  // const handleChange = (e) => {
  //   setUsername(e.target.value)
  // }
  // const handleChange1 = (e) => {
  //   setPassword(e.target.value)
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
  }

  return (
    <div>
      <If condition={loggedIn}>
        <Then>
          <Button intent="danger" onClick={logout} style={{
            "margin-left": "1171px",
            "margin-top": "18px"
          }}>Logout</Button>
        </Then>
        <Else>
          <form style={{ "width": "28rem", "margin-left": "auto", "margin-top": "0px", "padding-top": "11px" }} >
            <input type="text" name="email" placeholder="Enter email" onChange={handleChange} required="true" />
            {/* <input type="text" name="username" placeholder="Enter Username" onChange={handleChange} /> */}
            <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required="true" />
            <Button intent="danger" onClick={handleSubmit}>Login</Button>
          </form>
        </Else>
      </If>
    </div>
  )
}

export default Login
