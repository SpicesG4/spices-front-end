import React,{ useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardColumns } from 'react-bootstrap';
import axios from "axios";
import foodJson from "./food.json";

function Search() {

    const [foodArr, setFoodArr]= useState(foodJson)
    const [meal, setMeal]=useState("")
    const [show,setShow]=useState(false)

    const foodSearch = async (e) => {
        e.preventDefault();
        let food = await axios.get(`https://api.edamam.com/search?q=${meal}&app_id=12edc7bd&app_key=2aeb08c0a471fdda9be5f6baa167bf6d`);
        setFoodArr(food.data.hits)
        setShow(true)
    }
   

   const handleMealName = (e) => {
        setMeal( e.target.value)
    }

    return (
        <>
           <input onChange={handleMealName}/>
           <button onClick={foodSearch}>search</button>
            {console.log(foodArr)}
           <CardColumns className='cardColumeStyly' >
                    {foodArr.length>0 &&

                        foodArr.map((item, index) => {
                            return (

                                <Card className='cardStyly' style={{ width: '20rem' }}>
                                    <Card.Img className='img-card' variant="top" src={item.recipe.image} />
                                    <Card.Body>
                                        <Card.Title className='titleStyly' >{item.recipe.label}</Card.Title>
                                        <Card.Text className='scrollBar' >
                                            <p>Ingredient</p>
                                            <p>{item.recipe.ingredientLines}</p>
                                            <p>Calories</p>
                                            <p>{item.recipe.calories}</p>
                                            <p>Total Time</p>
                                            <p>{item.recipe.totalTime}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </CardColumns>
        </>
    )
}

export default Search
