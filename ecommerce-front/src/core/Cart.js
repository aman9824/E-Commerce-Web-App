import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getProducts} from "./apiCore";
import {Link} from "react-router-dom";
import FullPageProduct from "./FullPageProduct";
import {getCart} from "./cartHelpers";
import Checkout from "./Checkout";

const Cart = () => {
    
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {items.length} items</h2>
                <hr/>
                {items.map((product, i) => (<fieldset style={{maxHeight: "80%"}}><FullPageProduct key={i} product={product} pos={false} setRun={setRun} run={run}/></fieldset>))}
            </div>
        );
    };

    const noItemsMessage = () => {
        return (<h2>Your Cart is Empty. <br/> <Link to="/shop">Continue Shopping</Link></h2>);
    };

    return (<Layout title="Shopping Cart" description="Manage Cart Items" className="container-fluid">
        <div className="row">
            <div className="col-7">
                {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>
            <div className="col-5">
                <h2 className="mb-4">Your cart summary</h2>
                <Checkout products={items}/>
            </div>
        </div>
    </Layout>);
};

export default Cart;