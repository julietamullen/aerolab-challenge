import React from "react"
import Product from "./Product"


const ProductsContainer = ({sorted, userPoints, setUserPoints, userHistory}) => {
        
    return(
        <div className="productsContainer" key={Math.floor(Math.random() * 10000)}>
        {sorted && sorted.map(product => {
        return <div key={Math.floor(Math.random() * 10000000)}>
                    <Product userHistory={userHistory} userPoints={userPoints} setUserPoints={setUserPoints} title={product.name} cost={product.cost} key={product._id} image={product.img.url} category={product.category}/>
                </div>
    })}</div>)
}

export default ProductsContainer