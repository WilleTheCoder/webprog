import React from "react";

function Home() {

    const order = JSON.parse(window.localStorage.getItem("order"))
    console.log(order)
    let nullFlag = order == null ? false : true
    console.log(order)
    return (
        <>
            <h1>Välkommen! </h1>
            <div>
                {
                    nullFlag && Object.entries(order).map(([k, v]) => (
                        <p> {k} : {v} </p>)
                    )
                }
            </div>
        </>
    )
}
export default Home;