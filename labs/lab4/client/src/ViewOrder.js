import { useState } from "react";

function ViewOrder(props) {
    const { shoppingCart } = props;
    const URL = "http://localhost:8080/orders"

    const [showOrder, setOrderFlag] = useState(false)
    const [order, setOrder] = useState({})

    function sendOrder() {
        console.log("sending order!");
        const data = []
        shoppingCart.map(salad => (
            data.push(Object.keys(salad.ingredients))
        ))
        console.log(data);

        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`An error occurred: ${res.status}`);
                }
                return res.json();
            })
            .then(res => {

                if (res.price == 0) {
                    return
                }
                setOrderFlag(true)
                setOrder(res)
                window.localStorage.setItem("order", JSON.stringify(res))
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
                <div className="row pb-3">
                    <h2>Varukorgen</h2>
                    {shoppingCart.map(salad => (
                        <div key={salad.uuid}> {Object.keys(salad.ingredients).join(', ')} , pris: {salad.getPrice()} kr</div>
                    ))}

                    <div className="d-inline-block text-center">
                        <button type="button" onClick={sendOrder} className="mt-3 btn btn-lg btn-primary">Order</button>
                    </div>
                </div>
            </div>

            {showOrder && <OrderComponent></OrderComponent>}
        </div>
    );

    function OrderComponent() {
        return (
            <div className="row h-200 p-5 bg-light border rounded-3">
                <h2> Order confirmation</h2>
                <div>
                    {Object.entries(order).map(([k, v]) => (
                        <p> {k} : {v} </p>)
                    )}
                </div>
            </div>
        )
    }
}
export default ViewOrder;