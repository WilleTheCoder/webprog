import React from "react";
import {Link} from "react-router-dom";
import ViewIngredient from ".//ViewIngredient";

function SelectMenuComponent({title, extras, extra, event}) {

    
    return(
    <><h2>{title}</h2><div className="row pb-3">
         {extras.map((item, index) => (
            
             <div key={index} className="col-3 p-1 fs-6">
                 <input value={item} type="checkbox" onChange={event} name={item} checked={!!extra[item]} />
                <Link to={`/view-ingredient/${item}`}> {item} </Link>
             </div>
         ))}

     </div><button type="submit" className="btn btn-primary">Lägg till</button></>
)};
export default SelectMenuComponent