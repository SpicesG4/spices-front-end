/* eslint-disable no-unused-expressions */
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./ChatOnline.css";
import { AuthContext } from '../../context/auth';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const { user, token, setUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [onlineFriends, setOnlineFriends] = useState(user.followers);
  const [fol, setFol] = useState()
  useEffect(() => {
    const getFriends = async () => {
      // const res = await axios.get("http://localhost:3001/users/friends/" + currentId);
      setFriends(user.followers);

      // console.log("followers", onlineFriends)
      // console.log("user.followers", user.followers)

    };

    getFriends();
  }, [user.followers]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f?._id)));
  }, [friends, onlineUsers]);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:3001/users2");
    let x = []
    console.log('???', user.followers, res.data)
    res.data.forEach((element, i) => {
      // console.log(i, user?.followers,(element?._id))
      // user?.followers?.includes(element?._id)
      user?.followers?.includes(element?._id) ? x.push(element) : null
    })
    console.log('??', x)
    setFriends(x)
  }

  useEffect(() => {
    getUsers()
  }, [user.followers])


  const postConversations = async (receiver) => {
    const body = {
      senderId: user._id,
      receiverId: receiver
    }
    try {
      const res = await axios.post("http://localhost:3001/conversations/", body);
    } catch (err) {
      console.log(err);
    }
  };



  const handleClick = async (reciveruser) => {
    await postConversations(reciveruser)
    try {
      const res = await axios.get(
        `http://localhost:3001/find/${currentId}/${reciveruser}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  async function nameUser() {
    for (let i = 0; i < user.followers?.length; i++) {

      const userss = await axios.get(`http://localhost:3001/users`, { params: { userId: user.followers[i] } })
      setFol(userss.data.username)
      console.log(userss.data);
    }

  }
  // nameUser()
  return (
    <div className="chatOnline">
      {friends?.map((o) => {


        return (
          <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  o?.profilePicture
                    ? o.profilePicture
                    : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{console.log(111, o)}</span>
          </div>
        )
      })}
    </div>
  );
}