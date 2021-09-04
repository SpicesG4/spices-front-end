import React, { useContext } from 'react'
import { AuthContext } from '../../../context/auth'

function Admin() {
    const { loggedIn, user, verified } = useContext(AuthContext);
    return (
        <div>
            {console.log(user, 'Home')}
            hello from Admin
        </div>
    )
}

export default Admin
