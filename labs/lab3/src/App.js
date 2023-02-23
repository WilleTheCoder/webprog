import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import ViewIngredient from ".//ViewIngredient";
import { Component, useState, setState } from "react";
import { Link, Routes, Route, NavLink } from "react-router-dom";

function App() {
  // [var, setterFunc] = useState(init_var)
  const [shoppingCart, setSalads] = useState([]);

  const saladSubmit = (salad) => {
    setSalads((oldState) => [...oldState, salad]);
  };

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
      {/* nav-pills/tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Hem
            </Link>
          </li>

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
