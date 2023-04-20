import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Shop/shop.css'; 
import { useParams } from "react-router-dom";

function Shop(props) {
  const [product, setProduct] = useState([]);
  const [single, setSingle] = useState([]);
  const { categoryId, filteredCategory } = props;

  const [activeProductIndex, setActiveProductIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getproducts = async () => {
    try {
      console.log(categoryId)
      if (categoryId===""){  
         const response = await axios.get("http://localhost:5000/item/getitem");
         setProduct(response.data);
        }

  else{
      const response = await axios.get(`http://localhost:5000/item/items/${categoryId}`);
      setProduct(response.data);
    }
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
  }, [categoryId]);
 

  const handleProductClick = (id) => {
    getsingleproduct(id);
  }

  return (
    <div className="product-container">
     
      {Array.isArray(product) && product.map((item, index) => (
        <div className="product-card" key={index}>
{console.log(product)}
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