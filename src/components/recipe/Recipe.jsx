import "./recipe.css";
import { MoreVert } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Edit from "../edit/Edit"





export default function Post({ recipes ,handleDelete, idx,getid ,username}) {


  const [anchorEl, setAnchorEl] = React.useState(null);

  const [updatpost, setEdit] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const editpost = () => {
    setEdit(true);
  };

  const [like, setLike] = useState(recipes.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser, token } = useContext(AuthContext);


  useEffect(() => {
   
    setIsLiked(recipes.likes.includes(currentUser._id));
    // console.log(token);
  }, [currentUser._id, recipes.likes]);

  useEffect(() => {

    // console.log(recipes,"res");
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:3001/users?userId=${recipes.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [recipes.userId]);

  const likeHandler = () => {
    try {
      axios.put("http://localhost:3001/like/" + recipes._id, { userId: currentUser._id }, {
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
      })

    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(recipes.createdAt)}</span>
          </div>
          <div className="postTopRight">
          { username == currentUser.username && <MoreVert onClick={handleClick}  /> }

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>{
                handleClose();
                 handleDelete(idx);
              }
                }>Delete</MenuItem>
              <MenuItem onClick={()=>{handleClose();editpost()}}>Edit</MenuItem>
             
            </Menu>
            {
              updatpost &&
              <Edit idx={idx} recipes={recipes} getid={getid}/>
            }
          </div>
        </div>
        <div className="postCenter">
          <img className="postImg" src={"http://localhost:3001/images/"+recipes.img} alt="" />
          <span className="postText">{recipes?.description}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            /> */}
            {/* <img
              className="likeIcon"
              src="./heart.png"
              onClick={likeHandler}
              alt=""
            /> */}
            <span className="likeIcon" onClick={likeHandler}>😋</span>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{recipes.comment} comments</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
