import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/auth'
import ChefRecipes from '../../chefRecipes/ChefRecipes';
import Friends from '../../friends/Friends';
import axios from "axios";
import Chef from '../../chefs/chefs';
import "./home.css"
import "../../../components/friends/friends.css"
import { Link } from "react-router-dom";
import HomeRecipe from '../../homeRicipe/HomeRecipe';
import Sidebar from "../../../components/sidebar/Sidebar";



function Home() {

    const [chef, setChef] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {

        const getChef = async () => {
            try {
                const chefList = await axios.get("https://spice-g4.herokuapp.com/list-chef", {
                    headers: {
                        Authorization: auth.token
                    }
                });
                setChef(chefList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getChef();
    }, [auth.user]);


    const HomeRightbar = () => {
        return (
            <>

               <div className="birthdayContainer">
                    <img className="birthdayImg" src="https://media.istockphoto.com/vectors/badge-chef-vector-id165960836?k=20&m=165960836&s=612x612&w=0&h=DUXHdgjxbv7QhEWee8tcEyNsArDXaHZqpLVQDtHKm1k=" alt="" />
                    <span className="birthdayText">
                        <b>Suggested Chefs</b>
                    </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <ul className="rightbarFriendList">
                    {chef.map((u) => (
                        <Link to={`/profile/${u.username}`} style={{ textDecoration: "none", color: "black" }}>
                            <Chef key={u.id} user={u} />
                        </Link>
                    ))}
                </ul>
            </>

        );
    };


   

    const { loggedIn, user, verified } = useContext(AuthContext);
    return (

        <div className="homeContainer">
     
            <Sidebar />
          
            {/* <div className="sidebarHome"> */}
              <HomeRecipe currunt={auth.user} />
            <div className="rightbarWrapper">
                <HomeRightbar />
            </div>
            
            {/* </div> */}
        </div>
    )
}

export default Home