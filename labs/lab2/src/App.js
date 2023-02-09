import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ShoppingCart from './ShoppingCart';
import { useState } from 'react';

function App() {

  const [salads, setSalads] = useState([]);

  const saladSubmit = (salad) => {
    setSalads({ ...salads, salad });
  }

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ShoppingCart cart={salads} />
      <ComposeSalad inventory={inventory} saladSubmit={saladSubmit} />

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}
export default App;