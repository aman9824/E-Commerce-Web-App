import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {listOrders, getStatusValues, updateOrderStatus} from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[]);

    const showOrdersLength = () => {
        if(orders.length > 0) {
            return (
                <h4 className="text-info display-2">Total Orders: {orders.length}</h4>
            );
        } else {
            return (
                <h4 className="text-danger display-2">No Orders</h4>
            );
        }
    };

    const showInput = (key, value) => {
        return (<div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly/>
        </div>);
    };

    const handleStatusChange = (e, orderId) => {
        //console.log("update order status");
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if(data.error) {
                console.log('Status Update failed');
            } else {
                loadOrders();
            }
        });
    };

    const showStatus = (o) => {
        return (<div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={(e) => handleStatusChange(e, o._id)}><option>Update Status</option>{statusValues.map((status, index) => {
                return (<option key={index} value={status}>{status}</option>);
            })}</select>
        </div>);
    };

    return (
        <Layout title="Order History" description="Manage all the orders here">
            <div className="row">
                <div className="container col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return (<div className="mt-5" key={oIndex} style={{borderBottom: "5px solid indigo"}}>
                            <h2 className="mb-5"><span>Order Id: {o._id}</span></h2>
                            <ul className="list-group mb-2">
                                <li className="list-group-item">{showStatus(o)}</li>
                                <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                                <li className="list-group-item">Amount: {o.amount}</li>
                                <li className="list-group-item">Ordered By: {o.user.name}</li>
                                <li className="list-group-item">Ordered On: {moment(o.createdAt).fromNow()}</li>
                                <li className="list-group-item">Delivery Address: {o.address}</li>
                            </ul>
                            <h3 className="mt-4 mb-4 font-italic">Total Number of Products: {o.products.length}</h3>
                            {o.products.map((p, pIndex) => {
                                return (<div className="mb-4" key={pIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                                    {showInput('Product Name', p.name)}
                                    {showInput('Product price', p.price)}
                                    {showInput('Product Quantity', p.count)}
                                    {showInput('Product Id', p._id)}
                                </div>);
                            })}
                        </div>);
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;