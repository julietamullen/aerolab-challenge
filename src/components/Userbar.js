import React from "react"
import coin from "../assets/coin.png"
import {Link} from "react-router-dom"

const Userbar = ({userPoints, userName, userHistory}) => {

        return(
        <div className="header">
            <div className="userbar">
                <span className="user">
                    <p>Welcome <b>
                        <Link to={{pathname: "../RedeemedProducts",
                        state: {userPoints, userName, userHistory}}}> {/*Paso los datos en la ubicación*/}
                        {userName}</Link></b>!</p>
                    <span className="points">
                        <b>{userPoints}</b><img src={coin} alt="points"/>
                    </span>
                </span>
            </div>
            <h1>Electronics</h1>
        </div>
        )
}

export default Userbar