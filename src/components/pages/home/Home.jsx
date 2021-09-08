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
        console.log(user, "user mo auth from friends")

        const getChef = async () => {
            try {
                const chefList = await axios.get("http://localhost:3001/list-chef", {
                    headers: {
                        Authorization: auth.token
                    }
                });
                setChef(chefList.data);
                console.log(chefList)
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
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Suggested Chefs</b>
                    </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <ul className="rightbarFriendList">
                    {chef.map((u) => (
                        <Link to={`/profile/${u.username}`} style={{ textDecoration: "none" }}>
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
<Sidebar/>
            <HomeRecipe currunt={auth.user} />
            {/* <div className="rightbar"> */}
            <div className="rightbarWrapper">
                <HomeRightbar />
            </div>
            {/* </div> */}
        </div>
    )
}

export default Home