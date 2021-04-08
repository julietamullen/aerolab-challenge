import React from "react"
import coin from "../assets/coin.png"

const Userbar = ({userPoints, userName}) => {
        return(<div className="userbar">
            <span className="user"><p>Welcome <b>{userName}</b>!</p>
            <span className="points"><b>{userPoints}</b><img src={coin} alt="points"/>
            </span></span>
            </div>
        )
}

export default Userbar