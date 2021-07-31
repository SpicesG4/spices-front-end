import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      data: [],
      user: {},
      showlog:true
    };
  }
  // eslint-disable-next-line no-undef
  handleSubmit = async (e) => {
  
    console.log("test")

    var apiBaseUrl = "http://localhost:3000/";
    var self = this;
    var payload = {
      username: this.state.username,
      password: this.state.password
    }
    const res = await axios.post(apiBaseUrl + 'signin', payload,
      {
        auth:
          payload
      })

    this.setState({
      user: res.data,
      showlog:false

    })

    console.log(res.data)

    // 2 components 
    // we have the user we have the role 
    // role : user // component : role:chef


  }

  render() {
    return (
      <div>
        {
          this.state.showlog && 
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
              />
            <TextField
              type="text"
              
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue.toString() })}
              />
            <br />
            <TextField
              type="text"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue.toString() })}
              />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit}>
            </RaisedButton>     </div>
        </MuiThemeProvider>
            }
            </div>
    );

  }
}
const style = {
  margin: 15,
};
export default Login;
