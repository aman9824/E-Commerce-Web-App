import React, { useState } from 'react';
import {Link, Redirect} from "react-router-dom";
import ShowImage from "./ShowImage";
import {addItem} from './cartHelpers';

const Card = ({product}) => {

    const [redirect, setRedirect] = useState(false);

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

    return (
        <div className="col-3 mb-4 grd">
            <div className="card sad">
                <div className="card-header"><strong>{product.name}</strong></div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p>{product.description.slice(0, 130)}</p>
                    <p>${product.price}</p>
                    <Link to={productUrl(product._id)} style={{width: "102%"}}>
                        <button className="btn btn-outline-primary mt-2 mb-2" style={{flow: "left", maxWidth: "100%", paddingLeft: "5px"}}>View Product</button>
                    </Link>
                    <button onClick={addToCart} className="btn btn-outline-success mt-2 mb-2" style={{flow: "left", textAlign: "center", maxWidth: "100%"}}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Card;