import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import ShowImage from "./ShowImage";
import {addItem, updateItem, removeItem} from './cartHelpers';

const FullPageProduct = ({product, pos = true, setRun = f => f, run = undefined}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const productUrl = (id) => {
        return "/product/" + id;
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart"/>
        }
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = () => {
        return (<div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control si" value={count} onChange={handleChange(product._id)}/>
            </div>
        </div>);
    };

    return (
        <div className="mb-4">
            <h2 className="header ml-4">{product.name}</h2>
            {shouldRedirect(redirect)}
            <div className="row m-4">
                <div className={ pos ? "sad1 col-20" : "sad2 col-20"}>
                    <ShowImage item={product} url="product"/>
                </div>
                <div className="col-6">
                    {pos && (<p><strong>Description: </strong>{product.description}</p>)}
                    <p><strong>Category: </strong>{product.category && product.category.name}</p>
                    {pos && (<p><strong>Availability: </strong>{(product.quantity - product.sold) > 0 ? "Yes" : "Out Of Stock"}</p>)}
                    <p><strong>Price: </strong>${product.price}</p>
                    {!pos && showCartUpdateOptions()}
                    {((product.quantity - product.sold) > 0 && pos) ? <button onClick={addToCart} className="btn btn-outline-success mt-2 mb-2">Add to Cart</button> : "" }
                    {!pos && (<Link to={productUrl(product._id)}>
                        <button className="btn btn-outline-primary mt-2 mb-2">View Product</button>
                    </Link>)}
                    <br/>
                    {!pos && (
                        <button onClick={() => {removeItem(product._id); setRun(!run);}} className="btn btn-outline-danger mt-2 mb-2">Remove Product</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FullPageProduct;