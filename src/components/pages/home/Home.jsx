import React,{useContext} from 'react'
import { AuthContext } from '../../../context/auth'

function Home() {
    const { loggedIn, user, verified } = useContext(AuthContext);
    return (
        <div>
             {console.log(user, 'Home')}
            hello from home
        </div>
    )
}

export default Home
