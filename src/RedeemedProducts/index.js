import React from "react";
import Userbar from "../components/Userbar.js";
import { useLocation, Link } from "react-router-dom";

const RedeemedProducts = () => {
  const location = useLocation(); // Busco los datos según ubicación
  const redeemedProducts = location.state.userHistory; // Busco el historial de productos canjeados

  return (
    <div className="App">
        <Userbar
        userName={location.state.userName}
        userPoints={location.state.userPoints}
        userHistory={location.state.userHistory}
        />

        <section className="wrapper">
        <h3 className="rdmh3">Redeemed products</h3>
        <Link to="/"><p>« Go back</p></Link>
            <div className="info">
            {redeemedProducts && // Por cada item en el historial, devuelvo un producto (comenzando por el canjeado más recientemente)
            redeemedProducts.reverse().map((product) => {
                return (
                <div
                    className="redeemedProduct"
                    key={Math.floor(Math.random() * 10000)}
                >
                    <h3>{product.name}</h3>
                    <img src={product.img.url} alt={product.name} />
                </div>
                );
            })}
        </div>
        </section>
    </div>
    );
};

export default RedeemedProducts;
