import React from "react";
import {API} from '../Config';

const ShowImage = ({item, url}) => {
    let url1 = API + "/" + url + "/photo/" + item._id;
    return (<div className="product-img">
        <img src = {url1} alt={item.name} className="photo" style={{maxHeight:"100%", maxWidth:"100%"}}/>
    </div>
);};

export default ShowImage;