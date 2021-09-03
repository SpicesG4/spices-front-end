import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import SignUpForm from './SignUpForm.jsx'
import SignInForm from './SignInForm.jsx'
import { If, Else, Then, When, Unless } from 'react-if';
import Home from '../../src/components/pages/home/Home'
import ChefRecipes from './chefRecipes/ChefRecipes';





function Auth(props) {


  const { loggedIn, user } = useContext(AuthContext);

  // let okToRender = loggedIn  false;
  return (
    <div>
      <SignInForm />
      <If condition={loggedIn}>

        <Then>
          <Unless condition={user?.verified}>
            you need to virfy your email
            <SignInForm />
          </Unless>
          <When condition={user?.verified}>
            {/* <Home /> */}
<ChefRecipes/>
          </When>
        </Then>
        <Else>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <SignUpForm />
            <p>You need to Signup / Signin </p>
            {/* <Signup /> */}

          </div>
        </Else>
      </If>
    </div>
  )
}

export default Auth
