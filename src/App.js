
import './App.css';
import { AuthContext } from './context/auth';
import { SettingContext } from './context/setting';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import Login from  "./components/pages/login/login";
// import Signup from './components/pages/signup/signup';
import Home from "./components/pages/home/Home";
import { useContext } from "react";
import Profile from "./components/pages/profile/Profile"
import User from './components/User.jsx';

// import SignInForm from './components/SignInForm.jsx'
import PrimarySearchAppBar from "./components/header/Header"
import Recipe from './components/recipe/Recipe';
import ChefRecipes from './components/chefRecipes/ChefRecipes';


function App() {
  const { loggedIn, user, verified } = useContext(AuthContext);
  return (
    <>

      <Router>
        <PrimarySearchAppBar />
        <Switch>
          <User />
          <Route exact path="/">
            {/* <Home /> */}
            {/* <ChefRecipes/> */}
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
