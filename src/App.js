import Userbar from "./components/Userbar.js"
import ProductsContainer from "./components/ProductsContainer.js"
import React, {useState, useEffect} from "react"

function App() {

  async function fetchData() {

// Levanto los datos de la API y seteo los estados en el momento en el que se monta el componente

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
  // Defino los productos
  setProducts(Object.values(productsJSON))
  // Defino el orden inicial de los produductos (en el que me los devuelve la API)
  setSorted(Object.values(productsJSON)) 
}

// BOTONES PARA ORDENAR

const sort = (e) => {if (products.length !== 0) {
  const order = e.target.value
  setSortedBy(order) // Defino de qué forma van a estar ordenados los productos según el botón en el que haga click/opción del menú que se elija
  }}

    const handleSorted = () => {if (products !== undefined) { // Devuelvo, según el caso, el array con los productos en el orden que el usuario los quiere ver, o la categoría que quiere ver
      switch(sortedBy) {
        case "Lowest": 
          setSorted([...products].sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost)))// Si se ordenan por precio ascendente, reordeno los productos ordenados por su precio en ese orden.
        break;
        case "Highest":
          setSorted([...products].sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost)))// De igual forma si se ordena por precio descendiente.
          break;
        case "Most recent":
          setSorted([...products]) // Si se ordena por "Más recientes", los productos se van a mostrar igual que como aparecen inicialmente
          break;
        case "Cameras": case "Audio" : case "Smart Home": case "Laptops": case "Monitors & TV": case "PC Accessories": case "Gaming": case "Tablets & E-readers": case "Phones": case "Drones": case "Phone Accessories":
          setSorted([...products.filter(product => product.category === sortedBy)]) // Si se ordenan por categorías, se van mostrar sólo los productos cuya categoría corresponda a la opción del menú seleccionada
          break;
        default:
          setSorted([...products]) // Por defecto, los productos se muestran en su orden inicial.
          break;
      }
    }}

// Defino los estados
const [userPoints, setUserPoints] = useState("")
const [userName, setUserName] = useState("")
const [products, setProducts] = useState()
const [sorted, setSorted] = useState()
const [sortedBy, setSortedBy] = useState("")

useEffect(() => {fetchData()}, []) // Voy a buscar los datos de la API cuando el componente se monte
useEffect(() => {handleSorted()}, [sortedBy]) //Cambio el orden de los productos cada vez que el usuario lo seleccione

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
