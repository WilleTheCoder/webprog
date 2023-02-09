import { useState } from 'react';
import inventory from './inventory.ES6.js';

function ComposeSalad(props) {
    let extras = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
    const [foundation, setFoundation] = useState('Pasta');
    const [extra, setExtra] = useState({ Bacon: true, Fetaost: true });

    let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation)

    return (
        <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
                <h2>Välj bas</h2>
                <select value={foundation} onChange={e => setFoundation(e.target.value)}>
                    {foundations.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
                {/* {extras.map(name => <div key={name} className="col-4">{name}</div>)} */}
            </div>
        </div>
    );
}
export default ComposeSalad;