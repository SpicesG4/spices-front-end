import React from 'react'
import "./profile.css";
import ChefRecipes from "../../chefRecipes/ChefRecipes";
import Friends from "../../friends/Friends";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from '../../../context/auth';
import Sidebar from "../../../components/sidebar/Sidebar";



function Profile() {
  const { user, token, setUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);
  const username = useParams().username;

  const fetchUser = async () => {

    const res = username ? await axios.get(`http://localhost:3001/users?username=${username}`, {
      headers: {
        Authorization: token
      }
    }) : await axios.get(`http://localhost:3001/users?userId=${user._id}`)
    setCurrentUser(res.data)
    // console.log(res.data,"res.data from profile")
  };
  useEffect(() => {
    // console.log("from profile user,token",username)
    fetchUser();
    console.log(123)
  }, [username]);

  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  currentUser?.coverPicture
                    ? currentUser.coverPicture
                    : "https://scontent.famm11-1.fna.fbcdn.net/v/t1.18169-9/12644659_1050515204992038_138287688519062450_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=e3f864&_nc_ohc=D49rU_fqLWgAX_8dlfR&_nc_ht=scontent.famm11-1.fna&oh=f0c9035357705eddd88c9958ba8613d5&oe=6158448D"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  currentUser.profilePicture
                    ? currentUser.profilePicture
                    : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{username ? username : user.username}</h4>
              <span className="profileInfoDesc">{currentUser.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            {username ? <ChefRecipes username={username} /> : <ChefRecipes username={user.username} />}
            {/* { username == user.username &&    <Friends  user={user}/>} */}
            <Friends user={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
