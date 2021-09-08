import React from 'react'

import "./friends.css";
// import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { Add, Remove } from "@material-ui/icons";



function Friends({ user }) {

  const [friends, setFriends] = useState([]);

  const auth = useContext(AuthContext);
  // console.log(user._id, token, "from Friends")

  // console.log(user, "user from friends")
  // console.log(auth.user, "auth from friends")
  // console.log(friends);
  const [followed, setFollowed] = useState(
    user.followings?.includes(auth.user._id)
  );
  // const [followings,setFollowings]=useState(currentUser.followings)
  useEffect(() => {
    // console.log(auth.user._id)
    // console.log(user, "use effect from friends")
    // console.log(auth.token, "kkkkkkkkkkkkkkkkkkkkk")
    const getFriends = async () => {

      try {
        const friendList = await axios.get("https://spice-g4.herokuapp.com/getFriends/" + user._id);

        setFriends(friendList.data);
        // console.log(user.followings?.includes(auth.user._id),user.followings,auth.user._id)
        setFollowed(user.followers?.includes(auth.user._id))
        // console.log(friendList)
      } catch (err) {
        console.log(err.message);
      }
    };

    getFriends();
    // console.log(friends);
  }, [user]);



  const handleClick = async () => {
    try {
      // console.log(auth.token)
      if (followed) {
        console.log(user._id)
        const friendList = await axios.put(`https://spice-g4.herokuapp.com/unfollow/${user._id}`, { userId: auth.user._id });

        setFriends(friendList.data);
        setFollowed(false)

      } else {
        const friendList = await axios.put(`https://spice-g4.herokuapp.com/follow/${user._id}`, { userId: auth.user._id });

        setFriends(friendList.data);
        setFollowed(true)


      }
    } catch (err) {
    }
  };


  const ProfileRightbar = () => {
    return (
      <>
        {/* follow */}
        {user.username !== auth.user.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}




        <div className="rightbarInfo">
          <div className="rightbarInfoItem">

          </div>
          {/* <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div> */}
          {/* <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1
                                ? "Single"
                                : user.relationship === 1
                                    ? "Married"
                                    : "-"}
                        </span>
                    </div> */}
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" ,color:"black"}}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">

        <ProfileRightbar />
      </div>
    </div>
  );
}


export default Friends