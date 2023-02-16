import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { Component, useState, setState } from 'react';

function App() {

  // [var, setterFunc] = useState(init_var)
  const [shoppingCart, setSalads] = useState([]);

  const saladSubmit = (salad) => {
    setSalads(oldState => [...oldState, salad]);
  }


  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ViewOrder shoppingCart={shoppingCart} />
      <ComposeSalad inventory={inventory} saladSubmit={saladSubmit} />

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}
export default App;


// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       shoppingCart : []
//     }
    
//   }
//   render(){

//      const saladSubmit = (salad) => {
//        this.setState({shoppingCart: salad})
//       //  setSalads([...shoppingCart, salad]);
//      }

//      return (
//        <div className="container py-4">
//       <header className="pb-3 mb-4 border-bottom">
//         <span className="fs-4">Min egen salladsbar</span>
//       </header>

//       <ViewOrder shoppingCart={this.state.shoppingCart} />
//       <ComposeSalad inventory={inventory} saladSubmit={saladSubmit} />

//       <footer className="pt-3 mt-4 text-muted border-top">
//         EDAF90 - webprogrammering
//       </footer>
//     </div>
//   );
// }
// } 
// export default App;