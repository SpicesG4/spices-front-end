
import './App.css';
import { AuthContext } from './context/auth';
import { SettingContext } from './context/setting';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { useContext, useState } from "react";

import User from './components/User.jsx';

import PrimarySearchAppBar from "./components/header/Header"
import Recipe from './components/recipe/Recipe';
//Main pages
//Home
import Home from "./components/pages/home/Home"
//Profile
import Profile from './components/pages/profile/Profile';
//Follow

import Messenger from './components/messenger/Messenger'

//Admin
import Admin from "./components/pages/admin/Admin"
import Signin from './components/signin/Signin';
import Rigester from './components/register/Signup';
import Search from './components/pages/search/Search';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
// import { SnackbarProvider } from 'notistack';
import Collapse from '@material-ui/core/Collapse';
import Follow from './components/pages/follow/FollowChef';

const theme = createTheme({
  palette: {
    primary: {
      // light: '#757ce8',
      main: 'rgb(230, 92, 0)',
      // dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      // light: '#ff7961',
      main: 'rgb(20, 31, 31)',
      // dark: '#ba000d',
      // contrastText: '#000',
    },
  },
});


function App() {

  const { loggedIn, user, verified } = useContext(AuthContext);
  return (
    <>
      {/* <Rigester /> */}
      <ThemeProvider theme={theme}>
      <Router>
        {loggedIn && <PrimarySearchAppBar />}
        <Switch>
          <Route exact path="/">
            {!loggedIn && <User />}
            {loggedIn && <Home />}

          </Route>


          <Route exact path="/home">
            <Home />
          </Route>

          <Route exact path="/Search">
            <Search />
          </Route>
          {/* //Make it dynamic */}
          <Route exact path="/profile">
            <Profile />

          </Route>
          <Route exact path="/profile/:username">
            <Profile />
          </Route>
          <Route exact path="/msg">
            <Messenger />
          </Route>

          <Route exact path="/followers">
<Follow />
            {/* <Follow /> */}
          </Route>

          <Route exact path="/signin">

            <Signin />
          </Route>

          <Route exact path="/signup">

            <Rigester />
          </Route>
          {/* user.role=="chef &&"  this should be added to avoid accesss*/}
          <Route exact path="/admin">

            <Admin />
          </Route>

        </Switch>
      </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
