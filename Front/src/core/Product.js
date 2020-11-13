import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {read, listRelated} from "./apiCore";
import FullPageProduct from "./FullPageProduct";
import Card from "./Card";

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = (productId) => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data.product);
                    }
                }); 
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (<Layout title="GNMJ Global" description="Let's Add to cart !!" className="container-fluid">
        <div className="row">
            {product && product.description && <FullPageProduct product={product} />}
        </div>
        <br />
        <hr />
        <h2 className="ml-4">Related Products</h2>
        <br />
        {relatedProduct.length > 0 && <div className="row ml-2">
            {relatedProduct.map((p, i) => (<Card key={i} product={p} />))}
        </div>}  
    </Layout>);
};

export default Product;