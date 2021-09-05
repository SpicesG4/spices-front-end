import React from 'react'

import "./friends.css";
// import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { Add, Remove } from "@material-ui/icons";



function Friends({user}) {

    const [friends, setFriends] = useState([]);
  
    const auth = useContext(AuthContext);

    // console.log(user._id, token, "from Friends")
    
    console.log(auth.user ,"user from friends")
    // const [followed, setFollowed] = useState(auth.user.followings.includes(user._id));
    // const [followings,setFollowings]=useState(currentUser.followings)
    useEffect(() => {
        console.log(user ,"user mo auth from friends")

        const getFriends = async () => {
            try {
                const friendList = await axios.get("https://spice-g4.herokuapp.com/getFriends/" + user._id, {
                    headers: {
                      Authorization: auth.token}
                    });
                setFriends(friendList.data);
                console.log(friendList.data)
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [auth.user]);

    // useEffect(() => {
    //     console.log(user ,"user mo auth from friends")

    //     const getChef = async () => {
    //         try {
    //             const chefList = await axios.get("https://spice-g4.herokuapp.com/list-chef" , {
    //                 headers: {
    //                   Authorization: auth.token}
    //                 });
    //                 setChef(chefList.data);
    //             console.log(chefList)
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getChef();
    // }, [auth.user]);

    // const handleClick = async () => {
    //     try {
    //         if (followed) {
    //           const data =await axios.put(`http://localhost:3001/unfollow/${user._id}`, { userId: auth.user._id }, {
    //                 headers: {
    //                   Authorization: 'Bearer ' + auth.token 
    //                 }
    //             });
    //             console.log(data,"data")
    //         //  dispatch({ type: "UNFOLLOW", payload: user._id });
    //         } else {
    //             await axios.put(`http://localhost:3001/follow/${user._id}`, { userId: auth.user._id }, {
    //                 headers: {
    //                   Authorization: 'Bearer ' + auth.token 
    //                 }
    //             });
    //             // dispatch({ type: "FOLLOW", payload: user._id });
    //         }
    //         setFollowed(!followed);
    //     } catch (err) {
    //     }
    // };

    // const HomeRightbar = () => {
    //     return (
    //         <>
    //             <div className="birthdayContainer">
    //                 <img className="birthdayImg" src="assets/gift.png" alt="" />
    //                 <span className="birthdayText">
    //                     <b>Suggested Chefs</b>
    //                 </span>
    //             </div>
    //             <img className="rightbarAd" src="assets/ad.png" alt="" />
    //             <h4 className="rightbarTitle">Online Friends</h4>
    //             <ul className="rightbarFriendList">
    //                 {chef.map((u) => (
    //                     <li  > {u.username} </li>
    //                 ))}
    //             </ul>
    //         </>
    //     );
    // };

    const ProfileRightbar = () => {
        return (
            <>
                {/* {user.username !== auth.user.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )} */}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
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
                            style={{ textDecoration: "none" }}
                        >
                            <div className="rightbarFollowing">
                                {/* <img
                                    src={
                                        friend.profilePicture
                                            ?  friend.profilePicture
                                            : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                                        }
                                    alt=""
                                    className="rightbarFollowingImg"
                                /> */}
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