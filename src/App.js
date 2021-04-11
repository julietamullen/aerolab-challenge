import Userbar from "./components/Userbar.js"
import ProductsContainer from "./components/ProductsContainer.js"
import React, {useState, useEffect} from "react"
import coin from "./assets/coin.png"

function App() {

// Defino los estados iniciales

const [userPoints, setUserPoints] = useState("")
const [userName, setUserName] = useState("")
const [userHistory, setUserHistory] = useState()

// Levanto los datos de la API y seteo los estados en el momento en el que se monta el componente

  async function fetchData() {

// HISTORIAL

    const getUserHistory = await fetch("https://coding-challenge-api.aerolab.co/user/history", {
      method: 'GET',
      headers:{
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZjNzA3OTc2NmZiNTAwMjRhYTg3OGIiLCJpYXQiOjE2MTc3MTk0MTd9.YU2O_MaeRhZ_ueVz3F6at8te5HrvAbmyaf-QRk8UwrA",
      }
    }
    )
    const history = await getUserHistory.json()
    setUserHistory(history)

// DATOS DEL USUARIO

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
}

const addPoints = (amount) => {
  var request = new XMLHttpRequest();

  request.open('POST', 'https://coding-challenge-api.aerolab.co/user/points');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZjNzA3OTc2NmZiNTAwMjRhYTg3OGIiLCJpYXQiOjE2MTc3MTk0MTd9.YU2O_MaeRhZ_ueVz3F6at8te5HrvAbmyaf-QRk8UwrA');

  var body = {
      'amount': amount
  };

  request.send(JSON.stringify(body));
  const newPoints = userPoints + amount
  alert(`You've added ${amount} points! You now have ${newPoints} points`)
  setUserPoints(newPoints) // Actualizo la cantidad de puntos a disposición
}

useEffect(() => {fetchData()}, []) // Voy a buscar los datos de la API cuando el componente se monte

  return (
    <div className="App">
      <Userbar
        userPoints={userPoints}
        setUserPoints={setUserPoints}
        userName={userName}
        userHistory={userHistory} />
      <section className="addPoints">
        <p onClick={()=>addPoints(1000)}>Add 1000<img src={coin} alt="points" className="coin"/></p>
        <p onClick={()=>addPoints(5000)}>Add 5000<img src={coin} alt="points" className="coin"/></p>
        <p onClick={()=>addPoints(7500)}>Add 7500<img src={coin} alt="points" className="coin"/></p>
      </section>
      <ProductsContainer 
        setUserPoints={setUserPoints}
        userPoints={userPoints}
        userHistory={userHistory}
        setUserHistory={setUserHistory}/>
    </div>
  );
}

export default App;
