import axios from "axios";
import { useEffect, useState,useContext } from "react";
import "./ChatOnline.css";
import { AuthContext } from '../../context/auth';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const {user, token,setUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [onlineFriends, setOnlineFriends] = useState(user.followers);

  useEffect(() => {
    const getFriends = async () => {
      // const res = await axios.get("http://localhost:3001/users/friends/" + currentId);
      setFriends(user.followers);

      console.log("followers",onlineFriends)
      console.log("user.followers",user.followers)

    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f?._id)));
  }, [friends, onlineUsers]);


  const postConversations = async (receiver) => {
    const body = {
      senderId:user._id,
      receiverId:receiver
    }
    try {
      const res = await axios.post("http://localhost:3001/conversations/",body);
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

  return (
    <div className="chatOnline">
      {user.followers.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}