import React from 'react'
import axios from "axios";
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

export class Socket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soket:null

    }
  }

  componentDidMount() {
 
    socket.on('connect', () => {
      socket.emit('join', { name:"workkk"});
      socket.on('test', (payload) => {
      //  console.log(payload)
      });
    });

    // socket.current.emit("addUser",this.props.user._id);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });

    // socket.current.on("getMessage", (data) => {
    //   // setArrivalMessage({
    //   //   sender: data.senderId,
    //   //   text: data.text,
    //   //   createdAt: Date.now(),
    //   // });
    // });




  }
  render() {
    return (
      <div>
        hello from socket
      </div>
    )
  }
}

export default Socket
