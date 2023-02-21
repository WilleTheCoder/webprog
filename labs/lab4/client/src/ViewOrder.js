import SelectMenuComponent from './SelectMenuComponent.js';

function ViewOrder(props) {
    const { shoppingCart } = props;

    const handleSubmit = event => {
        props.orderSubmit(shoppingCart);
        console.log(shoppingCart);
        event.preventDefault();
    }

    return (
        <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
                <div className="row pb-3">
                    <h2>Varukorgen</h2>
                    {shoppingCart.map(salad => (
                        <div key={salad.uuid}> {Object.keys(salad.ingredients).join(', ')} , pris: {salad.getPrice()} kr</div>
                    ))}
                    <div className="row pt-3">
                    <button onClick={handleSubmit} className="btn btn-primary">Beställ</button>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default ViewOrder;