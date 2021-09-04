import React, { useContext } from 'react'
import { AuthContext } from '../../../context/auth'
// import Friends from '../../friends/Friends';
function Follow() {
    const { loggedIn, user, verified } = useContext(AuthContext);
    return (
        <div>
            {/* {console.log(user, 'Home')} */}
            hello from Followers
            {/* <Friends user={user}/> */}
        </div>
    )
}

export default Follow
