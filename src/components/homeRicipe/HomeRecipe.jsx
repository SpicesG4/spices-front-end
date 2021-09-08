import { useContext, useEffect, useState } from "react";
import Recipe from "../recipe/Recipe";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import Share from "../share/Share";
import "./homeRecipe.css"

export default function HomeRecipe({ currunt }) {
  const [recipes, setRecipes] = useState([]);
  const { user,token,fetchUser } = useContext(AuthContext);


  const fetchRecipes = async () => {
   
  
    const res =  await axios.get("http://localhost:3001/getallfood/" + currunt._id);
      // console.log(res.data)
    setRecipes(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
    
  };


  useEffect(() => {
      fetchRecipes();
  }, [currunt, currunt._id]);


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
  
// console.log('???')

  return (
    <div className="feed">
      <div className="feedWrapper">
        {console.log(recipes)}

        {(!currunt || currunt.username === user.username) && <Share />}
        {/* {recipes.map((p,idx) => ( */}
          <Recipe recipes={{likes:[]}} handleDelete={handleDelete} getid={getid} username={currunt.username} />
          {/* ))}   */}
      </div>
    </div>
  );
}
