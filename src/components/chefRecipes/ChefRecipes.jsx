import { useContext, useEffect, useState } from "react";
import Recipe from "../recipe/Recipe";

import axios from "axios";
import { AuthContext } from "../../context/auth";
import Share from "../share/Share";


export default function ChefRecipes({ username }) {
  const [recipes, setRecipes] = useState([]);
  const { user,token } = useContext(AuthContext);


  const fetchRecipes = async () => {
    console.log(user);
    const res = user.username
      ? await axios.get("https://spice-g4.herokuapp.com/profile/" + user.username)
      : await axios.get("https://spice-g4.herokuapp.com/getallfood/" + user._id);
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


  const handleDelete = async (i) => {
    // console.log(recipes)
    const data = await axios.delete("https://spice-g4.herokuapp.com/deletefood/" + recipes[i]._id, {
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
          <Recipe key={p._id} recipes={p} handleDelete={handleDelete}  idx={idx} getid={getid} />
          ))}  
      </div>
    </div>
  );
}
