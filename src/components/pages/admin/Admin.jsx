import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/auth'
import axios from "axios";

function Admin() {
  const { token, user, setUser } = useContext(AuthContext);
  const [users, UpdateAllusers] = useState([])
  const [fetchafterDelete, UpdatefetchafterDelete] = useState([false])
  useEffect(() => {
    async function fetchData() {
      console.log("tokken", token)



      // will be filtered in order not to return (myself) to the lisr  {current user} as well
      const allusers = await axios.get("https://spice-g4.herokuapp.com/listusers", {
        headers: {
          Authorization: token
        }
      })
      UpdateAllusers(allusers.data)
      console.log(allusers.data)
    }
    fetchData();
  }, [fetchafterDelete])

  async function remove(id) {
    console.log(user)

    console.log(id)
    try {
      const res = await axios.delete("https://spice-g4.herokuapp.com/deleteUser/" + id, {
        headers: {
          Authorization: token
        },
        data: {
          userId: user._id
        }
      })
      UpdatefetchafterDelete(!fetchafterDelete)
      console.log(user)
    } catch (err) {

      console.log(err)
    }
  }

  return (
    <div>
      {users?.map((item) => {
        return (
          <>
           {(item.role !== 'admin') &&
          <>
            <p>{item.email}</p>
            <p onClick={() => remove(item._id)} >Remove </p>
            </>
            }
          </>
        )
      })}
    </div>
  )
}

export default Admin