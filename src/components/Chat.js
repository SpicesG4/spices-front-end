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

    }
  }

  componentDidMount() {


  }




  getConversations = async () => {
    try {

      const res = await axios.get(`http://localhost:3001/conversations/${this.state.user._id}`);
      this.setState({
        conversationArr: res.data
      })

    }

    catch (err) {
      console.log(err);

      console.log("error")

    }
  };



  conversation = async () => {
    const payload = {
      senderId: this.state.user._id,
      receiverId: this.state.receiverId
    }
    const conversation = await axios.post('http://localhost:3001/conversations', payload)


  }


  saveMessage = async () => {
    // console.log(this.state.conversationId);
    const payload = {
      conversationId: this.state.conversationId,
      sender: this.state.user._id,
      text: this.state.message

    }
    const savedmessage = await axios.post('http://localhost:3001/messages', payload)

  }


  getcoid = async () => {
    try {

      const res = await axios.get(`http://localhost:3001/find/${this.state.user._id}/${this.state.receiverId}`);

      this.setState({
        conversationId: res.data._id
      })
      this.getMessages();
    } catch (err) {
        console.log(err)
    }

  };


  getMessages = async () => {
    try {
      const res = await axios.get("http://localhost:3001/messages/" + this.state.conversationId);
      // console.log(res, "maaaaassseeeeegggggggg");
      this.setState({ messagearray: res.data })

    } catch (err) {
      console.log(err);
    }
  };



  joinroom=()=>{

    const payload = {
      senderId: this.state.user._id,
      receiverId: this.state.receiverId,
      room:Date.now()
    }
console.log("first time ," ,payload)

    socket.emit('joinroon', payload)

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
                this.getcoid()
                this.joinroom()

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
              receiverId: this.state.receiverId,
              conversationId: this.state.conversationId
            })
            this.state.messagearray.push({ "sender": this.state.user._id, "text": this.state.message })
            this.saveMessage()
          }}>send</button>
        </div>

        {this.state.messagearray.map((ele) => {
          return (<div >
            <div> {ele.sender} ff</div>
            <div> {ele.text} fefe</div>
          </div>)
        })}

<div>


   <p> {this.state.message} hello</p>
  
</div>
      </div>
    )
  }
}

export default Socket
