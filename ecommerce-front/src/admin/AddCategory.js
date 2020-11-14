import React, {useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {createCategory} from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //destructure user and token from localstorage

    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // make request to API to create Category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
            }
        });
    };

    const newCategoryForm = () => {
        return (<form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>Create Category</button>
        </form>);
    };

    const showSuccess = () => {
        if(success) {
            return (<h3 className="text-success">{name} is created</h3>);
        }
    };

    const showError = () => {
        if(error) {
            return (<h3 className="text-danger">Category should be unique</h3>);
        }
    };

    const goBack = () => {
        return (<div className="mt-5">
            <Link to="/admin/dashboard" className="btn btn-outline-primary">Go to Dashboard</Link>
        </div>);
    };

    return (
        <Layout title="Add Category" description="Hii Admin, ready to add New Category !!">
            <div className="row">
                <div className="container col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;