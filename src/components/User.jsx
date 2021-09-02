import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import SignUpForm from './SignUpForm.jsx'
import SignInForm from './SignInForm.jsx'
import { If, Else, Then, When, Unless } from 'react-if';
import Home from '../../src/components/pages/home/Home'





function Auth(props) {


  const { loggedIn, user, verified } = useContext(AuthContext);

  // let okToRender = loggedIn  false;
  return (
    <div>
      <SignInForm />
      <If condition={loggedIn}>

        <Then>
          <Unless condition={verified}>
            {console.log(user, 'unless')}
            you need to virfy your email
            <SignInForm />
          </Unless>
          <When condition={verified}><Home/>
          {console.log(user, 'when')}
          </When>
        </Then>
        <Else>
          <dev style={{ textAlign: 'center', marginTop: '100px' }}>
            <SignUpForm />
            <p>You need to Signup / Signin </p>
            {/* <Signup /> */}

          </dev>
        </Else>
      </If>
    </div>
  )
}

export default Auth
