
import React from 'react';
const OptionsComponent = ({ options, value, onChange, title }) => (
    <div>
      <h2>{title}</h2>
      <div className="row pb-3">
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
export default OptionsComponent;