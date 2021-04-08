import React, {useEffect} from "react"
import bag from "../assets/bag.png"
import coin from "../assets/coin.png"
import Aos from "aos";
import "aos/dist/aos.css";

const Product = (props) => {

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    const {title, cost, image, userPoints, setUserPoints, category} = props

    let canRedeem = false

    if (cost < userPoints) {
        canRedeem = true
    } else {
        canRedeem = false
    }

    const redeemProd = () => {
        const newPoints = userPoints - cost
        alert(`Redeemed succesfully! You have ${newPoints} points left`)
        setUserPoints(newPoints)
    }

    return (
        <div className={`product ${canRedeem ? "available" : ""}`} key={Math.floor(Math.random() * 10000)} >
            <div className="front">
                <p>{category}</p>
                <img src={image} alt={title}/>
                <h3>{title}</h3>
            </div>
            <div className={`bottom ${canRedeem ? "bag" : ""}`}>
                <p>{canRedeem ? 
                    <img src={bag} alt="Redeem"/> 
                    : <>You are missing {cost - userPoints} <img src={coin} alt="points" className="coin"/></>
                }</p>
            </div>
            {canRedeem ? 
                <div className="redeemNow">
                    <b>{cost} <img src={coin} alt="points" className="coin"/></b>
                    <button className="redeemBtn" onClick={redeemProd}>REDEEM NOW </button>
                </div> 
                : "" }
        </div>
    )
}

export default Product