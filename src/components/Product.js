import React from "react"
import bag from "../assets/bag.png"
import coin from "../assets/coin.png"

const Product = (props) => {

    const {title, cost, image, userPoints, setUserPoints, category} = props

    let canRedeem = false

    if (cost < userPoints) { // Me fijo si el usuario tiene los suficientes puntos para canjear el producto
        canRedeem = true
    } else {
        canRedeem = false
    }

    const redeemProd = () => {
        const newPoints = userPoints - cost 
        alert(`Redeemed succesfully! You have ${newPoints} points left`)
        setUserPoints(newPoints) // Actualizo la cantidad de puntos que le quedan después de haber canjeado el producto
    }

    return (
        <div className={`product ${canRedeem ? "available" : ""}`} key={Math.floor(Math.random() * 10000)} > {/* Cambia la clase del div de acuerdo a si el usuario tiene suficientes puntos */}
            <div className="front">
                <p>{category} </p>
                <img src={image} alt={title}/>
                <h3>{title}<i>{cost} pts.</i></h3>
            </div>
            <div className={`bottom ${canRedeem ? "bag" : ""}`}>
                <p>{canRedeem ? /*Si tiene suficientes puntos, va a aparece una bolsa de compras*/
                    <img src={bag} alt="Redeem"/> 
                    : <>You are missing {cost - userPoints} <img src={coin} alt="points" className="coin"/></> /*De lo contrario, va a aparecer cuántos puntos le faltan*/
                }</p>
            </div>
            {canRedeem ? /*Este div va a aparecer en hover de los productos que pueda canjear, con un botón para canjearlos.*/
                <div className="redeemNow">
                    <b>{cost} <img src={coin} alt="points" className="coin"/></b>
                    <button className="redeemBtn" onClick={redeemProd}>REDEEM NOW</button>
                </div> 
                : "" }
        </div>
    )
}

export default Product