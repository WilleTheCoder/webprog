import { useState } from 'react';
import inventory from './inventory.ES6.js';
import Salad from './Salad.js';

function ComposeSalad(props) {
    const [foundation, setFoundation] = useState('Pasta');
    const [protein, setProtein] = useState('Kycklingfilé');
    const [dressing, setDressing] = useState('Ceasardressing');
    const [extra, setExtra] = useState({});

    let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
    let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
    let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
    let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);

    const handleChange = event => {
        const { name, checked } = event.target;
        setExtra(oldState => {
            const copy = { ...oldState };
            copy[name] = checked;
            return copy;
        });
    };

    const handleSubmit = event => {   
        event.preventDefault();
        let extras = Object.keys(extra).filter((n) => extra[n]);
        let ingredients = [foundation, protein, ...extras, dressing]
        let salad = new Salad();

        ingredients.forEach((i) => salad.add(i, inventory[i]));
        resetForm();
        props.saladSubmit(salad);       
    }

    const resetForm = function() {
        setFoundation('Pasta');
        setProtein('Kycklingfilé');
        setDressing('Ceasardressing');
        setExtra({});
    }

    return (
        <div className="container col-12">
            <form onSubmit={handleSubmit}>
                <div className="row h-200 p-5 bg-light border rounded-3">

                    <h2>Välj bas</h2>
                    <div className="row pb-3">
                        <select value={foundation} onChange={e => setFoundation(e.target.value)}>
                            {foundations.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>

                    <h2>Välj protein</h2>
                    <div className="row pb-3">
                        <select value={protein} onChange={e => setProtein(e.target.value)}>
                            {proteins.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>

                    <h2>Välj dressing</h2>
                    <div className="row pb-3">
                        <select value={dressing} onChange={e => setDressing(e.target.value)}>
                            {dressings.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>

                    <h2>Välj tillbehör</h2>
                    <div className="row pb-3">
                        {extras.map((item, index) => (
                            <div key={index} className="col-3 p-1 fs-6">
                                <input value={item} type="checkbox" onChange={handleChange} name={item} checked={!!extra[item]} />
                                <span> {item}</span>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="btn btn-primary">Lägg till</button>
                </div>
            </form>
        </div >
    );
}
export default ComposeSalad;