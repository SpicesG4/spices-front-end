/* eslint-disable react/jsx-no-undef */
import React, { useContext,useEffect ,useState} from 'react'
import { AuthContext } from '../../../context/auth'
// import Friends from '../../friends/Friends';
import axios from "axios";
import { useParams } from 'react-router';
function Follow() {
    const { token, user,setUser, verified } = useContext(AuthContext);
const[chefs,UpdateAllchefs]=useState([])
const[followOrUnfollow,UpdatefollowToUnfollow]=useState('follow this chef')

useEffect( ()  => {

async function fetchData() {
// will be filtered in order not to return (myself) to the lisr  {current user} as well
    const allchefs=await axios.get("http://localhost:3001/list-chef/", {
        headers: {
          Authorization: token
        }})
        UpdateAllchefs(allchefs.data)
        
  }
  fetchData();
}, [])
async  function follow(id)
{
console.log(id)
    try {
       const res=await axios.put("http://localhost:3001/follow/" + id, { userId: user._id }, {
          headers: {
            Authorization: 'Bearer ' + token 
          }
        })
  console.log(user)
  setUser(res.data)
      } catch (err) { 

        console.log(err)
      }}
      async  function unfollow(id)
      {
      console.log(id)
          try {
             const res=await axios.put("http://localhost:3001/unfollow/" + id, { userId: user._id }, {
                headers: {
                  Authorization: 'Bearer ' + token 
                }
              })
        console.log(user)
        setUser(res.data)
            } catch (err) { 
      
              console.log(err)
            }}
      

    return (
        <div>
            {/* {console.log(user, 'Home')} */}
            hello from Followers
            {/* <Friends user={user}/> */}
            {console.log(user, 'Home')}



            
         {chefs?.map((item)=>{
             return(
                 <>
                              <p>{item.username}</p>
                             <p> {user.followings.includes(item._id) ?
                         <p  onClick={()=>follow(item._id)} >follow </p>

                           :
                            
                           <p  onClick={()=>unfollow(item._id)} >unfollow  </p>

                             
                             } </p>

                 </>
             )
         })}

        </div>
    )
}

export default Follow
