import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Shop/shop.css'; // Import your CSS file

function Shop() {
  const [product, setProduct] = useState([]);
  const [single, setSingle] = useState([]);

  const [activeProductIndex, setActiveProductIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getproducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/item/getitem");
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
    getproducts();
  }, []);
 

  const handleProductClick = (id) => {
    getsingleproduct(id);
  }

  return (
    <div className="product-container">
     
      {product && product.map((item, index) => (
        <div className="product-card" key={index}>

          { item.discount_per === 0 ? null : <div className="discount">{item.discount_per}%</div>}

          <div className="image-product" onClick={() => handleProductClick(item._id)}>
             <img src={item.image.url}/>
           </div>
           
           <div className="content-product">
           <h3>{item.name}</h3>
          {/* <p>{item.description}</p> */}
          <h4>{item.weight} kg</h4>
           </div>
           <div className="price">
            {item.price === item.price_after_discount  ? <h3>{item.price}$</h3> : 
              <div className="price"> 
                <h3>{ item.price_after_discount}$</h3> 
                <h4>{item.price}$</h4>
              </div>
            }
           </div>
           <div className="button-card">
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
  );
}

export default Shop;
