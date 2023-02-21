import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import ViewIngredient from ".//ViewIngredient";
import { Component, useState, setState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";

const URL = "http://localhost:8080/"

function App() {
  // [var, setterFunc] = useState(init_var)
  const [shoppingCart, setSalads] = useState([]);
  const [inventory, setInventory] = useState({})

  const saladSubmit = (salad) => {
    setSalads(oldState => [...oldState, salad]);
  }

  const orderSubmit = (shoppingCart) => {
    postOrder("http://localhost:8080/orders/", shoppingCart);
    console.log(shoppingCart)
    setSalads([]);
    console.log(shoppingCart)
    //send post
  }

  async function postOrder(url, shoppingCart){
    let order = shoppingCart.map((salad) =>
      Object.keys(salad.ingredients)
    );
    console.log(JSON.stringify(order))
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(order),
    });
    console.log(response);
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

  async function fetchIngredient(props, name) {
    return await safeFetchJson(`http://localhost:8080/${props}/${name}`).then(
      (ingredient) => {
        return { [name]: ingredient };
      }
    );
  }

  async function fetchInventory(property) {
    const ingredients = await safeFetchJson(`http://localhost:8080/${property}`);
    return (
      await Promise.all(
        ingredients.map((name) => fetchIngredient(property, name))
      )
    ).reduce((acc, curr) => {
      const [ingredientName] = Object.keys(curr);
      return { ...acc, [ingredientName]: curr[ingredientName] };
    }, {});
  }

  async function fetchAll() {
    const foundations = fetchInventory("foundations");
    const proteins = fetchInventory("proteins");
    const extras = fetchInventory("extras");
    const dressings = fetchInventory("dressings");

    const combinedInventory = Object.assign(...await Promise.all([
      foundations,
      proteins,
      extras,
      dressings])
    );
    return combinedInventory;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAll();
      setInventory(data);
    }
    fetchData();
  }, []);

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
            element={<ViewOrder shoppingCart={shoppingCart} orderSubmit={orderSubmit} />}
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
