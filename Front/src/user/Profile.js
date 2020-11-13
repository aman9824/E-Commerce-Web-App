import React, { useEffect, useState } from "react";
import Layout from '../core/Layout';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import {read, update, updateUser} from './apiUser';

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        error: false,
        success: false
    });

    const {name, email, error, success} = values;
    const {token} = isAuthenticated();

    const init = (userId) => {
        read(userId, token).then(data => {
            if(data.error) {
                setValues({...values, error: true});
            } else {
                setValues({...values, name: data.name, email: data.email});
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = (n) => (e) => {
        setValues({...values, error: false, [n]: e.target.value});
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, {name, email}).then(data => {
            if(data.error) {    
                console.log(data.error);
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true});
                });
            }
        });
    };

    const redirectUser = (success) => {
        if(success) {
            return (<Redirect to="/cart"/>);
        }
    };

    const profileUpdate = (name, email, password) => {
        return (<form className="col-md-4 mr-1">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange("name")} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" onChange={handleChange("email")} className="form-control" value={email} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>);
    };

    return (<Layout title="Profile" description="Update Profile" className="container-fluid">
        <h2 className="mb-4">Profile Update</h2>
        {profileUpdate(name, email)}
        {redirectUser(success)}
    </Layout>);
};

export default Profile;