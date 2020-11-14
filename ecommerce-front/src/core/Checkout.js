import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {getBraintreeClientToken, processPayment, createOrder} from "./apiCore";
import DropIn from 'braintree-web-drop-in-react';
import {emptyCart} from './cartHelpers';

const Checkout = ({products}) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error});
            } else {
                setData({clientToken: data.clientToken});
            }
        }); 
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getTotal = () => {
        return parseFloat(products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)).toFixed(2);
    };

    const showCheckout = () => {
        return (
            isAuthenticated() ? (
                <div className="col-9">{showDropIn()}</div>
            ) : (
                <Link to="/signin">
                    <button className="btn btn-primary mt-3">Sign in to Checkout</button>
                </Link>
            )
        );
    };

    let dataAddress = data.address;

    const buy = () => {
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data);
            nonce = data.nonce; 
            //once you have nonce (cardtype, card number) send nonce as 'payment Method Nonce'
            //also the total money
            //console.log('send nonce and total to process: ', nonce, getTotal(products));
            const paymentData = {paymentMethodNonce: nonce, amount: getTotal()};
            processPayment(userId, token, paymentData)
            .then(response => {
                const createOrderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: dataAddress
                };
                createOrder(userId, token, createOrderData);
                setData({...data, success: true});
                emptyCart(() => {
                    console.log("Thank you for shopping with us !!");
                });
                window.location.reload();
            })
            .catch(error => {console.log(error);});
        })
        .catch(error => {
            //console.log("dropin error", error);
            setData({...data, error: error.message});
        });

    };

    const handleAddress = (event) => {
        setData({...data, address: event.target.value});
    };

    const showDropIn = () => {
        return (
            <div onBlur={() => setData({...data, error: ""})}>
                {data.clientToken != null && products.length > 0 ? (
                    <div> 
                        <div className="gorm-group mb-3">
                            <label className="text-muted">Delivery Address:</label>
                            <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Type your delivery address here..." />
                        </div>
                        <div>
                            <DropIn options = {{
                                authorization: data.clientToken,
                                /*paypal: {
                                    flow: "valt"
                                }*/
                            }} onInstance={instance => (data.instance = instance)}/>
                            <button className="btn btn-success" onClick={buy}>Pay</button>
                        </div>
                    </div>   
                ) : null}
            </div>
        );
    };

    const showError = error => {
        return (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            </div>
        );
    };

    const showSuccess = success => {
        return (
            <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thanks, Transaction was successful!
            </div>
        );
    };

    return ( <div>
        <h2>Total: ${getTotal()}</h2>
        {showError(data.error)}
        {showSuccess(data.success)}
        {showCheckout()}
    </div>
    );
};

export default Checkout;