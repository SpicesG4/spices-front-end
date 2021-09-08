import React, { useContext, useState, useEffect } from 'react';

import superagent from 'superagent';
import { AuthContext } from './auth'
const API = 'http://localhost:3001';
export const SettingContext = React.createContext();





function Setting(props) {
  const { user } = useContext(AuthContext);
  const [state, setstate] = useState({})
  useEffect(() => {
    setstate(user)
  }, [])




  return (
    <div>
      <SettingContext.Provider
        value={state}
      >
        {props.children}
      </SettingContext.Provider>
    </div>
  )
}

export default Setting