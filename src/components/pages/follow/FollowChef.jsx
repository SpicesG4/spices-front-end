/* eslint-disable react/jsx-no-undef */
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/auth'
// import Friends from '../../friends/Friends';
import axios from "axios";
import { useParams } from 'react-router';
import { Add, Remove } from "@material-ui/icons";
import "./card.css";
import Sidebar from "../../../components/sidebar/Sidebar"

function Follow() {
  const { token, user, setUser, fetchUser } = useContext(AuthContext);
  const [chefs, UpdateAllchefs] = useState([])
  const [followOrUnfollow, UpdatefollowToUnfollow] = useState('follow this chef')

  useEffect(async () => {
    await fetchUser()
    console.log(user)

    // will be filtered in order not to return (myself) to the lisr  {current user} as well
    const allchefs = await axios.get("https://spice-g4.herokuapp.com/list-chef/", {
      headers: {
        Authorization: token
      }
    })
    UpdateAllchefs(allchefs.data)
  }, [])
  async function follow(id) {

    try {
      const res = await axios.put("https://spice-g4.herokuapp.com/follow/" + id, { userId: user._id }, {
        headers: {
          Authorization: token
        }
      })
      fetchUser()


    } catch (err) {

      console.log(err)
    }
  }
  async function unfollow(id) {
    console.log(id)
    try {
      const res = await axios.put("https://spice-g4.herokuapp.com/unfollow/" + id, { userId: user._id }, {
        headers: {
          Authorization: token
        }
      })

      fetchUser()
      // or change response
    } catch (err) {

      console.log(err)
    }
  }


  return (
    <>
   

      <div className="bodyu">

   <Sidebar />
        <div className="rightBar">
          {chefs?.map((item) => {
            return (

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
                  <p>CHEF</p>
                  <div class="stats">

                    <div class="stat">
                      <span class="stat-num">{item.followings.length}</span>
                      <span class="stat-name">FOLLOWING</span>
                    </div>

                    <div class="stat">
                      <span class="stat-num">{item.followers.length}</span>
                      <span class="stat-name">FOLLOWERS</span>
                    </div>
                  </div>

                </div>
                <p> {user.followings.includes(item._id) ? <button className="rightbarFollowButton" onClick={() => unfollow(item._id)}>"Unfollow" <Remove /> </button> :
                  <button className="rightbarFollowButton" onClick={() => follow(item._id)}>
                    "Follow"  <Add /> </button>
                } </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Follow
