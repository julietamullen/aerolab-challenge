import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RedeemedProducts from "./RedeemedProducts"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch, useLocation} from "react-router-dom"

function Location () {
  const location = useLocation();
  return (
  <Switch location={location} key={location.pathname}>
  <Route exact path="/" component={App}></Route>
  <Route exact path="/RedeemedProducts" component={RedeemedProducts}></Route>
  </Switch>

)
}
ReactDOM.render(
  <Router>
<Location/>
  </Router>,
  document.getElementById('root')
);
reportWebVitals();
