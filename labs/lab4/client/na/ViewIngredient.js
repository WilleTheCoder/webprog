import { useParams } from "react-router-dom";

function ViewIngredient({ inventory }) {
  const { name } = useParams(); //name of ingredient
  console.log(name);
  const attr = Object.entries(inventory[name])
    .filter(([k, v]) => v === true)
    .map(([k, v]) => k);

  console.log(attr);

  return (
    <div className="container py-4">
      <ul>
        {attr.map((v) => (
          <li> {v} </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewIngredient;
