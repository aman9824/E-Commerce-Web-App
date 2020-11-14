import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {getProducts, deleteProduct} from './apiAdmin';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        })
    };

    const destroy = (productId) => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const upUrl = (p) => {return "/admin/product/update/"+p};

    return (<Layout title="Manage Products" description="CRUD Operations" className="container-fluid">
        <h1 className="mb-4">We have Total {products.length} Products</h1>
        <div className="row">
            <div className="col-7">
                <ul className="list-group">
                    {products.map((p, i) => (
                        <li key={i} className="list-group-item d-flex justify-content-between">
                            <strong>{p.name}</strong>
                            <div>
                                <Link to={upUrl(p._id)}>
                                    <button className="btn btn-outline-primary mr-3">Update</button>
                                </Link>
                                <button className="btn btn-outline-danger mr-10" onClick={() => destroy(p._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Layout>);
};

export default ManageProducts;