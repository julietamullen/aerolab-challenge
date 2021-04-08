import Userbar from "./components/Userbar.js"
import ProductsContainer from "./components/ProductsContainer.js"
import React, {useState, useEffect} from "react"

function App() {

  async function fetchData() {

// Fetching user's info from API

    const userData = await fetch("https://coding-challenge-api.aerolab.co/user/me", {
        method: 'GET',
        headers:{
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZjNzA3OTc2NmZiNTAwMjRhYTg3OGIiLCJpYXQiOjE2MTc3MTk0MTd9.YU2O_MaeRhZ_ueVz3F6at8te5HrvAbmyaf-QRk8UwrA",
        }
    }
    )
    const user = await userData.json()
    setUserName(user.name)
    setUserPoints(user.points)

// Fetching products info from API

    const productsData = await fetch("https://coding-challenge-api.aerolab.co/products", {
      method: 'GET',
      headers:{
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZjNzA3OTc2NmZiNTAwMjRhYTg3OGIiLCJpYXQiOjE2MTc3MTk0MTd9.YU2O_MaeRhZ_ueVz3F6at8te5HrvAbmyaf-QRk8UwrA",
      }
  }
  )

  const productsJSON = await productsData.json()
  setProducts(Object.values(productsJSON))
  setSorted(Object.values(productsJSON))
}

// Sorting buttons

const sort = (e) => {if (products.length !== 0) {
  const order = e.target.value
  setSortedBy(order)
  }}

    const handleSorted = () => {if (products !== undefined) {
      switch(sortedBy) {
        case "Lowest": 
          setSorted([...products].sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost)))
        break;
        case "Highest":
          setSorted([...products].sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost)))
          break;
        case "Most recent":
          setSorted([...products])
          break;
        case "Cameras": case "Audio" : case "Smart Home": case "Laptops": case "Monitors & TV": case "PC Accessories": case "Gaming": case "Tablets & E-readers": case "Phones": case "Drones": case "Phone Accessories":
          setSorted([...products.filter(product => product.category === sortedBy)])
          break;
        default:
          setSorted([...products])
          break;
      }
    }}

// Hooks

const [userPoints, setUserPoints] = useState("")
const [userName, setUserName] = useState("")
const [products, setProducts] = useState()
const [sorted, setSorted] = useState()
const [sortedBy, setSortedBy] = useState("Most recent")
useEffect(() => {fetchData()}, [])
useEffect(() => {handleSorted()}, [sortedBy])

  return (
    <div className="App">
      <div className="header">
        <Userbar userPoints={userPoints} userName={userName}/>
        <h1>Electronics</h1>
      </div>

      <section className="wrapper">
        <section className="buttons"><h3>Sort by:</h3>
            <button onClick={sort} value="Most recent" className={`button ${sortedBy === "Most recent"? "selected" : ""}`}>Most recent</button>
            <button onClick={sort} value="Lowest" className={`button ${sortedBy === "Lowest"? "selected" : ""}`}>Lowest Price</button>
            <button onClick={sort} value="Highest" className={`button ${sortedBy === "Highest"? "selected" : ""}`}>Highest Price</button>
        </section>
        <div className="select">
        <select className="selectCategory" onChange={sort}>
          <option value="default">All categories</option>
          <option value="Cameras">Cameras</option>
          <option value="Smart Home">Smart Home</option>
          <option value="Audio">Audio</option>
          <option value="Laptops">Laptos</option>
          <option value="Monitors & TV">Monitors & TV</option>
          <option value="PC Accessories">PC Accessories</option>
          <option value="Gaming">Gaming</option>
          <option value="Tablets & E-readers">Tablets & E-readers</option>
          <option value="Phones">Phones</option>
          <option value="Drones">Drones</option>
          <option value="Phone Accessories">Phone Accessories</option>
        </select>
        </div>
      </section>
      <ProductsContainer sorted={sorted} setProducts={setProducts} setUserPoints={setUserPoints} userPoints={userPoints} sortedBy={sortedBy} setSortedBy={setSortedBy}/>
    </div>
  );
}

export default App;
