import React, { useState } from "react";
import Layout from "../core/Layout";
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
        redirectToReferrer: false
    });

    const {email, password, success, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, success: true});
        signin({email, password}).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false});
            } else {
                authenticate(data, () => {setValues({
                    ...values,
                    email: '',
                    password: '',
                    error: '',
                    success: true,
                    redirectToReferrer: true
                })});
            }
        });
    };
    
    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError = () => (<div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>);

    const showLoading = () => (
        success && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    );

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>;
            } else {
                return <Redirect to="/user/dashboard"/>;
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/"/>;
        }
    };
    
    return (
        <Layout title="Signin Page" description="Node React E-Commerce App" className="container col-md-8 offset-md-2">{showLoading()}
        {showError()}
        {signupForm()}
        {redirectUser()}
        </Layout>);
};

export default Signin;