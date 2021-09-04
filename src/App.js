
import './App.css';
import { AuthContext } from './context/auth';
import { SettingContext } from './context/setting';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import Login from  "./components/pages/login/login";
// import Signup from './components/pages/signup/signup';
import { useContext } from "react";
import Profile from "./components/pages/profile/Profile"
import User from './components/User.jsx';

// import SignInForm from './components/SignInForm.jsx'
import PrimarySearchAppBar from "./components/header/Header"
import Recipe from './components/recipe/Recipe';
//Main pages
//Home
import Home from "./components/pages/home/Home"
//Profile
import ChefRecipes from './components/chefRecipes/ChefRecipes';
//Follow
import Follow from "./components/pages/follow/Follow"

//Admin
import Admin from "./components/pages/admin/Admin"

function App() {
  const { loggedIn, user, verified } = useContext(AuthContext);
  return (
    <>

      <Router>
        <PrimarySearchAppBar />
        <Switch>
          <Route exact path="/">
                   <User />
          </Route>


          <Route exact path="/home">
<Home/>
          </Route>

{/* //Make it dynamic */}
          <Route exact path="/profile">
                   <ChefRecipes/>
          </Route>

          <Route exact path="/followers">

<Follow />
          </Route>
     


{/* user.role=="chef &&"  this should be added to avoid accesss*/}
          <Route exact path="/admin">

<Admin />
          </Route>
        
        </Switch>
      </Router>
    </>
  );
}

export default App;
