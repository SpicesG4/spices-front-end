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
      receiverId: "",
      conversationId: null
    }
  }

  componentDidMount() {
    let user = this.props.user;
    // console.log(user);
    this.setState({ user: user })

    socket.on('connect', () => {
      console.log("connect");



      socket.emit('adduser', { ...user })

      socket.on("getUsers", (payload) => {
        let usersarrayst = [];
        payload.map(userp => {
          if (userp.userId !== this.state.user._id) {
            usersarrayst.push(userp)
          }
          return
        })
        this.setState({ allUsers: usersarrayst })
      });

      socket.on('offlineUser', (payload) => {


      });


      socket.on('getMessage', (payload) => {
      });

      this.getConversations()


    });


  


  }




   getConversations = async () => 
    { 
      
      console.log("testdidmount",this.state.user._id)
      try 
      { 

      const res = await axios.get(`http://localhost:3001/conversations/${this.state.user._id}`)
      ; 

    this.setState({
      conversationArr:res.data
    })
    

    console.log(res.data,"respoonse")
    } 




      catch (err) { console.log(err);
      
        console.log("errrrroe")

      } 
    
    };

  














  conversation = async () => {

    console.log("onclick")
    const payload = {
      senderId: this.state.user._id,
      receiverId: this.state.receiverId

    }
    const conversation = await axios.post('http://localhost:3001/conversations', payload)



    this.setState({
      conversationId: conversation.data._id
    })
    //const res = await axios.post(apiBaseUrl + 'signin', payload,

  }


  saveMessage = async () => {
    const payload = {
      conversationId: this.state.conversationId,
      sender: this.state.user._id,
      text: this.state.message

    }


    const savedmessage = await axios.post('http://localhost:3001/messages', payload)



    // console.log("saved Msg", savedmessage.data)
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
                console.log("clicked")
                this.conversation()

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
              text: this.state.message, senderId: this.state.user._id,
              receiverId: this.state.receiverId
            })

            this.saveMessage()
          }}>send</button>
        </div>



      </div>
    )
  }
}

export default Socket
