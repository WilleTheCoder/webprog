import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import ViewIngredient from "./ViewIngredient";
import { Component, useState, setState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";


function App() {
  // [var, setterFunc] = useState(init_var)

  //this.state = {shoppingBasket: [], inventory: {}};
  const [shoppingCart, setSalads] = useState([]);
  const [inventory, setInventory] = useState({});

  const saladSubmit = (salad) => {
    setSalads(oldState => [...oldState, salad]);
  }

  function safeFetchJson(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('${ url } returned status ${ response.status }');
        }
        return response.json();
      });
  }

  const fetchIngredient = function (url, ingredient) {
    return fetch(url + ingredient).then((response) => {
      if (!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
      }
      return response.json();
    });
  };

  const fetchInventory = function (target) {
    let url = `http://localhost:8080/${target}/`;
    safeFetchJson(url)
      .then((ings) => {
        let props = ings.map((ing) => fetchIngredient(url, ing));
        return Promise.all(props).then((p) =>
          p.reduce(
            (prev, current, index) => ({ ...prev, [ings[index]]: current }),
            {}
          )
        );
      });
  }

  useEffect(() => {
    Promise.all([
      fetchInventory("foundations"),
      fetchInventory("proteins"),
      fetchInventory("dressings"),
      fetchInventory("extras"),
    ])
      .then((groups) =>
      groups.reduce((prev, curr) => ({ ...prev, ...curr }))
      )
      .then((ings) => setInventory(ings));
  });

  const renderPage = () => {
    return (
      <div className="container py-4">
        {<Header title="Min egen salladsbar"></Header>}
        {<Navbar />}
        <Routes>
          <Route
            path="/compose-salad"
            element={
              <ComposeSalad inventory={inventory} saladSubmit={saladSubmit} />
            }
          ></Route>
          <Route
            path="/checkout"
            element={<ViewOrder shoppingCart={shoppingCart} />}
          ></Route>
          <Route path="/" element={<h1>Välkommen!</h1>}></Route>
          <Route path="*" element={<h1>ERORROOR</h1>}></Route>
          <Route
            path="/View-ingredient/:name"
            element={<ViewIngredient inventory={inventory} />}
          ></Route>
        </Routes>
        {<Footer />}
      </div>
    );
  };

  function Header({ title }) {
    return (
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">{title}</span>
      </header>
    );
  }

  function Navbar() {
    return (
      <>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/compose-salad">
              Skapa sallad
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/checkout">
              Varukorgen
            </Link>
          </li>
          {/* more links */}
        </ul>
      </>
    );
  }

  function Footer() {
    return (
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    );
  }

  return renderPage();
}
export default App;
