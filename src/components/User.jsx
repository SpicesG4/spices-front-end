import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import SignUpForm from './SignUpForm.jsx'
import SignInForm from './SignInForm.jsx'
import { If, Else, Then, When, Unless } from 'react-if';
import Home from '../../src/components/pages/home/Home';
import ChefRecipes from './chefRecipes/ChefRecipes';

import Friends from "../components/friends/Friends"
import Rigester from './register/Signup';
import Signin from './signin/Signin';




function Auth(props) {


  const { loggedIn, user } = useContext(AuthContext);

  // let okToRender = loggedIn  false;
  return (
    <div>
      {/* <SignInForm /> */}
      <Signin />
      <If condition={loggedIn}>

        <Then>
          <Unless condition={user?.verified}>
            you need to virfy your email
            {/* <SignInForm /> */}
            <Signin />
          </Unless>
          <When condition={user?.verified}>
            {/* <Home /> */}
{/* <ChefRecipes/> */}

          </When>
        </Then>
        <Else>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            {/* <Rigester /> */}
          
            {/* <Signin /> */}

          </div>
        </Else>
      </If>
    </div>
  )
}

export default Auth
