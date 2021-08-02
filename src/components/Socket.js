import React from 'react'
import axios from "axios";
import io from 'socket.io-client';
import Messages from './messages'
const SERVER_URL = process.env.SERVER_URL || 'localhost:3001/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

export class Socket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      message: "",
      user: "",
      allUsers: [],
      receiverId: ""
    }
  }

  componentDidMount() {
    let user = this.props.user;
    console.log(user);
    this.setState({ user: user })

    socket.on('connect', () => {
      console.log("connect");



      socket.emit('adduser', { ...user })

      socket.on("getUsers", (payload) => {
        let usersarrayst = [];
        console.log(payload, "hhhhhoooo");
        payload.map(userp => {
          if (userp.userId !== this.state.user._id) {
            usersarrayst.push(userp)
          }
          return
        })
        console.log(usersarrayst, "aaaaaaaaaaa");
        this.setState({ allUsers: usersarrayst })
      });

      socket.on('offlineUser', (payload) => {
        console.log('HELLO?', payload)


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
        {
          this.state.allUsers.map(
            (user) => {
              <p onClick={() => { this.setState({ receiverId: user.userId }) }}>{user.userId}</p>
            }
          )
        }
        <div>

          <input
            type="text"
            hintText="Enter your message"
            floatingLabelText="message"
            onChange={(event) => this.setState({ message: event.target.value })}
          />
          <button onClick={() => {
            socket.emit('sendmassege', {
              text: this.state.message, senderId: this.state.user._id,
              receiverId: "666666"
            })
          }}>send</button>
        </div>



      </div>
    )
  }
}

export default Socket
