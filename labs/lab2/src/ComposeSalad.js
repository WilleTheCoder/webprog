import { useMemo, useState } from 'react';
import inventory from './inventory.ES6.js';
import Salad from './Salad.js';
import OptionsComponent from './OptionComponent.js';
import SelectMenuComponent from './SelectMenuComponent.js';

function ComposeSalad(props) {
    const [foundation, setFoundation] = useState('Pasta');
    const [protein, setProtein] = useState('Kycklingfilé');
    const [dressing, setDressing] = useState('Ceasardressing');
    const [extra, setExtra] = useState({});

    let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
    let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
    let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
    let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
    // let foundations = useMemo(() => { //ref3
    //     return Object.keys(props.inventory).filter(name => props.inventory[name].foundation)
    //   }, [props.inventory]);

    const handleChange = event => {
        const { name, checked } = event.target;
        setExtra(oldState => {
            const copy = { ...oldState };
            copy[name] = checked;
            return copy;
        });
    };

    const handleSubmit = event => {     
        let extras = Object.keys(extra).filter((n) => extra[n]);
        let ingredients = [foundation, protein, ...extras, dressing]
        let salad = new Salad();
        ingredients.forEach((i) => salad.add(i, inventory[i]));
        
        props.saladSubmit(salad);  
        resetForm();
        event.preventDefault();
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

                <OptionsComponent
                options={foundations}
                value={foundation}
                onChange={setFoundation}
                title="Välj foundation"
                />
                <OptionsComponent
                options={proteins}
                value={protein}
                onChange={setProtein}
                title="Välj protein"
                />
                <OptionsComponent
                options={dressings}
                value={dressing}
                onChange={setDressing}
                title="Välj dressing"
                />

                <SelectMenuComponent 
                title = "Välj tillbehör"
                extras = {extras}
                extra = {extra}
                event = {handleChange}
                ></SelectMenuComponent>
                
                </div>
            </form>
        </div >
    );
}
export default ComposeSalad;