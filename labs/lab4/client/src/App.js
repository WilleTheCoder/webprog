import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import ViewIngredient from ".//ViewIngredient";
import { Component, useState, setState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";

const URL = "http://localhost:8080/"

function App() {
  const [shoppingCart, setSalads] = useState([]);
  const [inventory, setInventory] = useState({})

  const saladSubmit = (salad) => {
    setSalads(oldState => [...oldState, salad]);
  }

  useEffect(() => {

    async function fetchData(url) {
      const response = await fetch(url, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
      }
      const data = await response.json();
      return data;
    }

    async function buildInventory() {
      const inv = {}
      const categories = ["foundations", "proteins", "extras", "dressings"]
      const categoryRes = await Promise.all(categories.map(category => fetchData(URL + category)))

      for (let i = 0; i < categories.length; i++) {
        const ingredients = categoryRes[i]
        const ingredientRes = await Promise.all(ingredients.map((ingredient) => fetchData(URL + categories[i] + "/" + ingredient)))

        for (let j = 0; j < ingredients.length; j++) {
          inv[ingredients[j]] = ingredientRes[j]
        }
      }
      setInventory(inv)
      console.log("inventory: ", inv);
    }
    buildInventory()
  }, [])

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