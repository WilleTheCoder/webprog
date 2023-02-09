
function ShoppingCart(props) {
    const { cart } = props;

    return (
        <div className="row pb-3">
            <h2>Varukorgen</h2>
            {cart.map(salad => (
                <div key={salad.uuid}> {Object.keys(salad.ingredients).join(', ')} , pris: {salad.getPrice()} kr</div>
            ))}
        </div>
    );
}
export default ShoppingCart;