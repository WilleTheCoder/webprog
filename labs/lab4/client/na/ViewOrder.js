function ViewOrder(props) {
    const { shoppingCart } = props;

    return (
        <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
                <div className="row pb-3">
                    <h2>Varukorgen</h2>
                    {shoppingCart.map(salad => (
                        <div key={salad.uuid}> {Object.keys(salad.ingredients).join(', ')} , pris: {salad.getPrice()} kr</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ViewOrder;