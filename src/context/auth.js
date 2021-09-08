import React, { Component, useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from "axios";
import swal from 'sweetalert';

import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
const API = 'https://spice-g4.herokuapp.com';
export const AuthContext = React.createContext();




function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")

  let setLoginState = async (loggedIn, token, user) => {
    cookie.save('auth', token, { path: "/" });
    setUser(user);
    setLoggedIn(loggedIn);
    setToken(token);
  };


  let login = async (username, password) => {
    try {
      const res = await superagent.post(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`)
      cookie.save('auth', res.body.token, { path: "/" });
      validateToken(res.body.token);
      await setUser(res.body.user)


      // fetchUser()
    }



    catch (error) {
      console.log('LOGIN ERROR', error.message);
    }
  };

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }


  let logout = () => {
    deleteAllCookies()

    setLoginState(false, null, {});
    // cookie.remove("auth");
    setLoggedIn(false)
    setUser(false)

    // window.location.reload();
  };



  let validateToken = async (token) => {
    const user = jwt.decode(token);
    if (user) {

      await setLoginState(true, token, user.username);
      fetchUser1(user.username._id)
    }

  };


  const signup = async (username, password, role, email, profilePicture, coverPicture) => {
    console.log(username, password, role, email, profilePicture, coverPicture);
    try {
      console.log("hiiii");
      const response = await superagent
        .post(`${API}/signup`, { username, password, role, email, profilePicture, coverPicture });
      validateToken(response.body.token);
      // swal("You Signed Up Successfully !", "please check your Email to verify ");
    } catch (e) {
      console.error('Signup Error', e.message);
    }
  };


  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
    console.log(user, "user")
  }, [loggedIn])


  async function fetchUser1(idd) {
    const userss = await axios.get(`https://spice-g4.herokuapp.com/users`, { params: { userId: idd } })
    setUser(userss.data)
  }

  async function fetchUser() {
    const userss = await axios.get(`https://spice-g4.herokuapp.com/users`, { params: { userId: user._id } })
    setUser(userss.data)
  }
  return (
    <div>
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState, signup, token, fetchUser }}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  )
}

export default Auth