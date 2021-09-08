import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardColumns } from 'react-bootstrap';
import axios from "axios";
import foodJson from "./food.json";
import AlarmIcon from '@material-ui/icons/Alarm';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import SearchIcon from '@material-ui/icons/Search';
import "./search.css";
import Sidebar from '../../../components/sidebar/Sidebar';


function Search() {

    const [foodArr, setFoodArr] = useState(foodJson)
    const [meal, setMeal] = useState("")
    const [show, setShow] = useState(false)

    const foodSearch = async (e) => {
        e.preventDefault();
        let food = await axios.get(`https://api.edamam.com/search?q=${meal}&app_id=12edc7bd&app_key=2aeb08c0a471fdda9be5f6baa167bf6d`);
        setFoodArr(food.data.hits)
        setShow(true)
    }


    const handleMealName = (e) => {
        setMeal(e.target.value)
    }

    return (
        <>
            <div className="bodySearch">
                <Sidebar/>
            <div className="rightBar"> 
            <div style={{ width: "40%", margin: "auto", borderRadius:"10px" }}>
                <div className="searchDiv" style={{ margin: "40px", borderRadius:"50px", backgroundColor:"black", border:"2px solid gray" ,backgroundColor:"#f2f2f2"}}>
                    <input className="searchInp" onChange={handleMealName} placeholder="Search for recipes"/>
                    <button onClick={foodSearch} className="searchBtn" ><SearchIcon className="iconSearch" style={{ color:"black" }} /></button>
                </div>
            </div>

            {foodArr.length > 0 &&
                foodArr.map((item, index) => {
                    return (
                        <div className='recpiseDIV' style={{ display: 'flex', flexDirection: 'row', display: 'inline-block', margin: 'auto'}}>

                            <Card className='cardStyly' style={{ width: '19rem', margin: "30px", marginLeft: "20%", marginBottom: '30px', border: 'solid #e6e6e6', flex: '1', boxShadow: "3px 2px 3px 2px rgba(230, 230, 230, 0.87)" }}>
                                <Card.Img className='img-card' variant="top" src={item.recipe.image} style={{ width: '18.9rem', height: '15rem', margin: 'auto', boxShadow: "0px 10px 5px #f5f5f0"}} />

                                <Card.Body>
                                    <Card.Title className='titleStyly' >{item.recipe.label}</Card.Title>
                                    <Card.Text className="over-view" style={{ height: '6rem', overflow: 'auto' }} >
                                        <span><LocalDiningIcon style={{ color: "#CF7500" }} /></span> Ingredient:
                                        <p>{item.recipe.ingredientLines}</p>
                                    </Card.Text>
                                    <Card.Text className='scrollBar' >
                                        {/* <p>Calories:  {item.recipe.calories}</p> */}
                                        <p><span><AlarmIcon style={{ color: "#CF7500" }} /></span>Time:  {item.recipe.totalTime} min</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
            </div>
          </div>
        </>
    )
}

export default Search