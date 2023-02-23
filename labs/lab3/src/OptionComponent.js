
import React from 'react';
const OptionsComponent = ({ options, value, onChange, title }) => (
    <div>
      <h2>{title}</h2>
      <div className="row pb-3">
        <select required className = "form-select" value={value} onChange={e => {onChange(e.target.value); e.target.parentElement.classList.add("was-validated");}}>
          <option value= "">Välj</option>
          {options.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Välj ett alternativ, tack!</div>
      <div className="valid-feedback">Bra val, den är god!</div>
      </div>
    </div>
  );
export default OptionsComponent;