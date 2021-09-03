import React, { Component, useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
const API = 'https://spice-g4.herokuapp.com';
export const AuthContext = React.createContext();





function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")

  let setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setUser(user?.username);
    setLoggedIn(loggedIn);
    setToken(token);
    
  };


  let login = async (username, password) => {
    try {
      const res = await superagent.post(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`)
      validateToken(res.body.token);
      setUser(res.body.user)
    } catch (error) {
      console.log('LOGIN ERROR', error.message);
    }
  };



  let logout = () => {
    setLoginState(false, null, {});
    // cookie.remove("auth");
    setLoggedIn(false)
    setUser(false)
    window.location.reload();
  };



  let validateToken = (token) => {
    if (token !== 'null') {
      const user = jwt.decode(token);
      setLoginState(true, token, user);
    } else {
      setLoginState(false, null, {});
    }
  };


  const signup = async (username, password, role, email) => {
    try {
      const response = await superagent
        .post(`${API}/signup`, { username, password, role, email });
      validateToken(response.body.token);
    } catch (e) {
      console.error('Signup Error', e.message);
    }
  };


  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
  }, [loggedIn])


  return (
    <div>
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState, signup ,token}}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  )
}

export default Auth