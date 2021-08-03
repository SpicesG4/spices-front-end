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
      message: "",
      user: "",
      allUsers: [],
      receiverId: "",
      conversationId: null,
      arraivalmessage: "",
      messagearray: [],
      onlineMessage: [],
      messagerec: ""

    }
  }

  componentDidMount() {
    this.getcoid();


    let user = this.props.user;
    // console.log(user);
    this.setState({ user: user })

    socket.on('connect', () => {
      console.log("connect");

      socket.on('getallmessages', (payload) => {
        console.log(payload, 'onnnliinnnn');
        this.setState({ onlineMessage: payload })
      })

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


      socket.on('getoneMessage', (payload) => {
        console.log(payload, "gggggggggg");

        this.setState({ message: payload.text })
      });
      // getoneMessagerecev

      socket.on('getoneMessagerecev', (payload) => {
        console.log(payload, "ggggggggggrrrrr");

        this.setState({ messagerec: payload.text })
      });
      this.getConversations()


    });







  }




  getConversations = async () => {

    console.log("testdidmount", this.state.user._id)
    try {

      const res = await axios.get(`http://localhost:3001/conversations/${this.state.user._id}`)
        ;

      this.setState({
        conversationArr: res.data
      })


      console.log(res.data, "respoonse")
    }




    catch (err) {
      console.log(err);

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




    //const res = await axios.post(apiBaseUrl + 'signin', payload,

  }


  saveMessage = async () => {
    console.log(this.state.conversationId);
    const payload = {
      conversationId: this.state.conversationId,
      sender: this.state.user._id,
      text: this.state.message

    }


    const savedmessage = await axios.post('http://localhost:3001/messages', payload)



    console.log("saved Msg", savedmessage.data)
  }
  getcoid = async () => {
    try {

      const res = await axios.get(`http://localhost:3001/find/${this.state.user._id}/${this.state.receiverId}`);
      console.log(res, "holls");
      // this.setState({ messagearray: res.data })
      this.setState({
        conversationId: res.data._id
      })
      this.getMessages();
    } catch (err) {
      console.log(err);
    }

  };
  getMessages = async () => {
    try {
      const res = await axios.get("http://localhost:3001/messages/" + this.state.conversationId);
      console.log(res, "maaaaassseeeeegggggggg");
      this.setState({ messagearray: res.data })

    } catch (err) {
      console.log(err);
    }
  };

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
            onChange={(event) => this.setState({ message: event.target.value }
            )}
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
            <div> {ele.sender}</div>
            <div> {ele.text}</div>
          </div>)
        })}

        {
          this.state.onlineMessage.length &&
          this.state.onlineMessage.map((ele) => {
            return (<div >
              <div> {ele.senderId}</div>
              <div> {ele.text}</div>
            </div>)
          })}
        {/* {this.state.message}...... */}


      </div>
    )
  }
}

export default Socket
