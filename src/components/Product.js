import React from "react"
import bag from "../assets/bag.png"
import coin from "../assets/coin.png"

const Product = (props) => {

    const {product, title, cost, image, userPoints, setUserPoints, userHistory, setUserHistory, category, id} = props

// AGREGO AL HISTORIAL LOS PRODUCTOS

async function addToHistory () {

    var request = new XMLHttpRequest();

    request.open('POST', 'https://coding-challenge-api.aerolab.co/redeem');

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZjNzA3OTc2NmZiNTAwMjRhYTg3OGIiLCJpYXQiOjE2MTc3MTk0MTd9.YU2O_MaeRhZ_ueVz3F6at8te5HrvAbmyaf-QRk8UwrA');

    var body = {
        'productId': `${id}`,
    };
    request.send(JSON.stringify(body));}

    let canRedeem = false

    if (cost < userPoints) { // Me fijo si el usuario tiene los suficientes puntos para canjear el producto
        canRedeem = true
    } else {
        canRedeem = false
    }

    const redeemProd = () => {
        const newPoints = userPoints - cost
        alert(`Redeemed succesfully!\nYou have ${newPoints} points left`)
        setUserHistory([...userHistory, product]) // Actualizo el estado con el producto nuevo
        addToHistory() // Agrego el producto al historial
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