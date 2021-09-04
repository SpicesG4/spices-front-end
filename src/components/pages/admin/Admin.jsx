import React, { useContext,useEffect ,useState} from 'react'
import { AuthContext } from '../../../context/auth'
import axios from "axios";

function Admin() {
    const { token, user, setUser } = useContext(AuthContext);
    const[users,UpdateAllusers]=useState([])
    const[fetchafterDelete,UpdatefetchafterDelete]=useState([false])

    useEffect( ()  => {
        async function fetchData() {
            

         

        // will be filtered in order not to return (myself) to the lisr  {current user} as well
            const allusers=await axios.get("http://localhost:3001/listusers", {
                headers: {
                  Authorization:token
                }})
                UpdateAllusers(allusers.data)
                console.log(allusers.data)
          }
          fetchData();
        }, [fetchafterDelete])

        async function remove (id)
        {
            console.log(id)
            try {
               const res=await axios.delete("http://localhost:3001/deleteUser/" + id, { userId: user._id }, {
                  headers: {
                    Authorization: 'Bearer ' + token 
                  }
                })
                UpdatefetchafterDelete(!fetchafterDelete)
          console.log(user)
              } catch (err) { 
        
                console.log(err)
              }}
        
    return (
        <div>
        {users?.map((item)=>{
             return(
                 <>
                              <p>{item.email}</p>
                         <p  onClick={()=>remove(item._id)} >Remove </p>

                          
                             
                             

                 </>
             )
         })}
        </div>
    )
}

export default Admin
