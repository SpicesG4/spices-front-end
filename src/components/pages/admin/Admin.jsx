import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/auth'
import axios from "axios";
import "../follow/card.css"
import Sidebar from "../../../components/sidebar/Sidebar"
import {  Remove } from "@material-ui/icons";

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
    <div className="bodyu">

<Sidebar />
<div className="rightBar">

    {users?.map((item) => {
      
        return (
          <>
           {(item.role !== 'admin') &&
          <>

<div className="card">
                <div className="img-container">
                  <div className="skewed">
                    <div >
                      <img id="img"
                        src={
                          item.profilePicture
                            ? item.profilePicture
                            : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                        }
                      />
                    </div>

                  </div>

                </div>
                <div className="content">
                  <h2>{item.username}</h2>
                  <div class="stats">

        
                  </div>
                  </div>
                  <button className="rightbarFollowButton" onClick={() => remove(item._id)} >Remove<Remove />  </button>

                  </div>

            </>
            }
          </>
        )
      })}
    </div>
    </div>
  )
}

export default Admin