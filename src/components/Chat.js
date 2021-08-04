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
      currentChat: [],
      message: null,
      user: "",
      allUsers: [],
      receiverId: "",
      conversationId: null,
      arraivalmessage: "",
      messagearray: [],
      loggedInuser:null,
      str:"",
      allmsg:[]
    }
  }

  componentDidMount() {
    let user = this.props.user;

    this.setState({
      loggedInuser:user
    })

    console.log(user)
    socket.on('connect', () => {
      console.log("connect");

socket.emit('adduser', { ...user })


// return all users expect current user(onmline)
      socket.on("getUsers", (payload) => {
        let usersarrayst = [];

        payload.map(userp => {
          if (userp.userId !== user._id) {
            usersarrayst.push(userp)
          }
          return
        })
        this.setState({ allUsers: usersarrayst })
      });



      socket.on("getoneMessage", (payload) => {
  
  this.state.messagearray.push({ "sender": payload.senderId, "text": payload.text })


      });

      //getallmessages

      socket.on("getallmessages", async (payload) => {
        // console.log("recived user", payload)
        

        await this.setState({
          allmsg:payload
        })


        console.log("recived user", this.state.allmsg)

        // this.state.allmsg.push({ "sender": payload.senderId, "text": payload.text })
      
      
            });
    });

  }




  
  
  render() {
    return (
      <div>
        {
          this.state.allUsers.map((user) => {
            return (
              <p onClick={() => {
                //Return all other users
                this.setState({ receiverId: user.userId })
                socket.emit('reciveID',user.userId)

                console.log("clicked")

              }}>{user.userId}</p>
            )
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
              text: this.state.message,
              receiverId: this.state.receiverId,
              senderId:this.state.loggedInuser._id,
              conversationId: this.state.conversationId
            })
            this.state.messagearray.push({ "sender": this.state.user._id, "text": this.state.message })
          }}>send</button>
        </div>






  
   {this.state.loggedInuser &&
   <p> 
   {this.state.loggedInuser.username}
   </p>
   }


{
  this.state.allmsg.length  &&

  this.state.allmsg.map((ele) => {
          return (<div >
            <div> mafa</div>
            <div> {ele.text} </div>
          </div>)
        })}

</div>
   
    )
  }
}

export default Socket
