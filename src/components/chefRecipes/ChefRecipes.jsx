import { useContext, useEffect, useState } from "react";
import Recipe from "../recipe/Recipe";

import axios from "axios";
import { AuthContext } from "../../context/auth";
import Share from "../share/Share";
import "./chefRecipes.css"

export default function ChefRecipes({ username,currunt }) {
  const [recipes, setRecipes] = useState([]);
  const { user,token,fetchUser } = useContext(AuthContext);


  const fetchRecipes = async () => {
   
  
    const res = username
      ? await axios.get("http://localhost:3001/profile/" + username)
      : await axios.get("http://localhost:3001/getallfood/" + currunt?._id, {
        headers: {
          Authorization: token
        }
      });
      // console.log(res.data)
    setRecipes(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
    
  };


  useEffect(() => {
      fetchRecipes();
    }, [username, user._id]);
    // console.log('?test')


  const handleDelete = async (i) => {
    // console.log(recipes)
    const data = await axios.delete("http://localhost:3001/deletefood/" + recipes[i]._id, {
      headers: {
        Authorization: token
      },
      data: {
        userId: user._id
      }
    })
     fetchRecipes();
  
  }
const getid = (idx)=>{
  // console.log("mmm")
return recipes[idx]._id
}
  

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {console.log(recipes)} */}
        {(!username || username === user.username) && <Share />}
        {recipes.map((p,idx) => (
          <Recipe key={p._id} recipes={p} handleDelete={handleDelete}  idx={idx} getid={getid} username={username} />
          ))}  
      </div>
    </div>
  );
}
