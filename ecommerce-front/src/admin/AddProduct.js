import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {createProduct, getCategories} from "./apiAdmin";

const AddProduct = () => {
    //destructure user and token from localstorage

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: '',
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {user, token} = isAuthenticated();

    const {name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData} = values;

    // Load Categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        let value = (name === 'photo') ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});
        console.log(formData);
        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => {
        
        return (<form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>

            </div>
            <div>
                <label>Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            <br />
            <button type="submit" className="btn btn-outline-primary">Create Product</button>
        </form>);
    };

    const showLoading = () => (
        loading && (<div className="alert alert-success"><h2>
            Loading...
        </h2></div>)
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            Product Successfully Added !!
        </div>
    );

    return (
        <Layout title="Add Product" description="Hii Admin, ready to add New Product !!">
            <div className="row">
                <div className="container col-md-8 offset-md-2">
                   {showLoading()}
                   {showSuccess()}
                   {showError()}
                   {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;