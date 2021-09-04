import React, { useContext } from 'react'
import { AuthContext } from '../../../context/auth'

function Follow() {
    const { loggedIn, user, verified } = useContext(AuthContext);
    return (
        <div>
            {console.log(user, 'Home')}
            hello from Followers
        </div>
    )
}

export default Follow
