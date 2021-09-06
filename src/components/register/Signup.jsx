import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { FormGroup, InputGroup, Button, Card, Label } from "@blueprintjs/core";
import "./signup.css"
import { Link } from "react-router-dom";




function Rigester() {

  const { signup } = useContext(AuthContext);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('chef');
  const [IMG, setIMG] = useState('');
  const [coverPicture, setcoverPicture] = useState('');

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

    if (e.target.name === 'IMG') {
      // console.log(e.target.value);
      setIMG(e.target.value);
    }

    if (e.target.name === 'coverPicture') {
      // console.log(e.target.value);
      setcoverPicture(e.target.value);
    }


    else {
      // console.log(e.target.value);
      setRole(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password, role, email, IMG, coverPicture);
  };



  return (
    <>
<div className="body" >
      <div className="form-box">
        <div className="header-text">
          Signup Form
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

        <input onChange={handleChange}
          name="IMG"
          required
          placeholder="Your Profile Image Address " />

        <input onChange={handleChange}
          name="coverPicture"
          required
          placeholder="Your Cover Image Address " />
        {/* <label>
<select onChange={handleChange} name="role" as="select">
              <option value="user">User</option>
              <option value="chef">Chef</option>

            </select>
</label> */}
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
    </>
  )
}

export default Rigester
