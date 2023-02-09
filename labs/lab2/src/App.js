import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';

class App extends Component {

  render() {
    return (
      <div className="container py-4">
        <ComposeSalad inventory={inventory} />

        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="submit"/>
        </form>
        
        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - webprogrammering
        </footer>
      </div>
    );
  }
}

export default App;