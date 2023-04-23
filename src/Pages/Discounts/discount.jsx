import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Discounts/discount.css'
import { useParams } from "react-router-dom";

function Discounts() {
  const [product, setProduct] = useState([]);
  const [single, setSingle] = useState([]);

  const {category_id} =useParams();

  const [activeProductIndex, setActiveProductIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getdiscounts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/item/getdiscount`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getsingleproduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/item/getitem/${id}`);
      setSingle(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(() => {
    getdiscounts();
  }, []);

  const handleProductClick = (id) => {
    getsingleproduct(id);
  }

  return (
<>
<div className="text-discount">
  <h2>You can see here all the items that have a discount!</h2>
  </div>
    <div className="product-container-discount">
      {Array.isArray(product) && product.map((item, index) => (
        <div className="product-card-discount" key={index}>
{console.log(product)}
          { item.discount_per === 0 ? null : <div className="discount">{item.discount_per}%</div>}

          <div className="image-product-discount" onClick={() => handleProductClick(item._id)}>
             <img src={item.image.url}/>
           </div>
           
           <div className="content-product-discount">
           <h3>{item.name}</h3>
          {/* <p>{item.description}</p> */}
          <h4>{item.weight} kg</h4>
           </div>
           <div className="price-discount">
            {item.price === item.price_after_discount  ? <h3>{item.price}$</h3> : 
              <div className="price-discount"> 
                <h3>{ item.price_after_discount}$</h3> 
                <h4>{item.price}$</h4>
              </div>
            }
           </div>
           <div className="button-card-discount">
              <button>Add to Cart</button>
            </div>
        </div>
      ))}
      
      {showPopup && (
        <div className="popup">
           <button onClick={() => setShowPopup(false)}> x </button>
          <p>{single.description}</p>
         
        </div>
      )}
      
    </div>
    </>
  );
}

export default Discounts;