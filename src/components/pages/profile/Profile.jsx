import React from 'react'
import "./profile.css";
import ChefRecipes from "../../chefRecipes/ChefRecipes";
import Friends from "../../friends/Friends";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from '../../../context/auth';
import Sidebar from "../../../components/sidebar/Sidebar";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ProfileBic from '../profilePicForm/profilePicForm'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function Profile() {
  const classes = useStyles();
  const { user, token, setUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);

  const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);
  const [coverPicture, setCoverPicture] = useState(currentUser.coverPicture);
  const username = useParams().username;
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let editBic = async (profipic, coverPic) => {
    let bodyObj = {
      "profilePicture": profipic,
      "coverPicture": coverPic
    }
    await axios.put(`https://spice-g4.herokuapp.com/updateUser/${user._id}`, bodyObj)
    fetchUser();
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <h2 id="simple-modal-title">   Edit picture form</h2> */}
      <ProfileBic profilePicture={profilePicture} setProfilePicture={setProfilePicture} coverPicture={coverPicture} setCoverPicture={setCoverPicture} editBic={editBic} handleClose={handleClose} />
      {/* <SimpleModal /> */}
    </div>
  );


  const fetchUser = async () => {

    const res = username ? await axios.get(`https://spice-g4.herokuapp.com/users?username=${username}`, {
      headers: {
        Authorization: token
      }
    }) : await axios.get(`https://spice-g4.herokuapp.com/users?userId=${user._id}`, {
      headers: {
        Authorization: token
      }
    })
    setCurrentUser(res.data)
    // console.log(res.data,"res.data from profile")
  };
  useEffect(() => {
    // console.log("from profile user,token",username)
    fetchUser();
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
              <div >
                <img
                  className="profileUserImg"
                  src={
                    currentUser.profilePicture
                      ? currentUser.profilePicture
                      : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                  }
                  alt=""
                />
                <span className="rightbarOnline profileUserImg" ><AddAPhotoIcon style={{
                  'box-shadow': '0 0 3px 3px #c5c3c3',
                  "backgroundColor": "#c5c3c3",
                  "border-radius": "30%",
                  "color": "#3f4440"

                }} onClick={handleOpen} />

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body}
                  </Modal>
                </span>
              </div>
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
