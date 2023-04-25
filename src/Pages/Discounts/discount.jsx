import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Discounts/discount.css'
import '../Shop/shop.css'; 

function Discounts(props) {
  const [product, setProduct] = useState([]);
  const [single, setSingle] = useState([]);
  const [flippedItem, setFlippedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { categoryId } = props;


  console.log(single, showPopup);
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

  const handleCardFlip = (itemId) => {
    if (flippedItem === itemId) {
      setFlippedItem(null); // unflip the card
    } else {
      setFlippedItem(itemId); // flip the card
    }
  }

  const handleMoreInfoClick = (itemId) => {
    getsingleproduct(itemId);
    handleCardFlip(itemId);
  }

  function addToCart(event, props){
    let id= props
    axios.post(`http://localhost:5000/cart/64332eb3dfcb091305c650e8`,{productId:id},{
        headers: { "Content-Type": "application/json",},
      })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <div className="text-discount">
        <h2>You can see here all the items that have a discount!</h2>
      </div>
      <div className="product-container-discount">
        {Array.isArray(product) && product.map((item, index) => (
          <div className={flippedItem === item._id ? "product-card flip" : "product-card"} 
            key={index}>
               <div className="hidden-wrp">
          <button className="infor" onClick={() => handleMoreInfoClick(item._id)}>!</button>
            { item.discount_per === 0 ? null : <div className="discount">{item.discount_per}%</div>}
            <div className="image-product">
              <img src={item.image.url} alt="product is not displaying"/>
            </div>
            <div className="content-product">
              <h3>{item.name}</h3>
              <h4>{item.weight} kg</h4>
            </div>
            <div className="price">
              {item.price === item.price_after_discount ? (
                <h3>{item.price}$</h3>
              ) : (
                <div className="price"> 
                  <h3>{ item.price_after_discount}$</h3> 
                  <h4>{item.price}$</h4>
                </div>
              )}
             
            </div>
            <div className="button-card">
                    <button>Add to Cart</button>
                  </div>
        </div>
              <div className="front">
            <button className="infor" onClick={() => handleMoreInfoClick(item._id)}>!</button>
            { item.discount_per === 0 ? null : <div className="discount">{item.discount_per}%</div>}
            <div className="image-product">
              <img src={item.image.url} alt="product is not displaying"/>
            </div>
            <div className="content-product">
              <h3>{item.name}</h3>
              <h4>{item.weight} kg</h4>
            </div>
            <div className="price">
              {item.price === item.price_after_discount ? (
                <h3>{item.price}$</h3>
              ) : (
                <div className="price"> 
                  <h3>{ item.price_after_discount}$</h3> 
                  <h4>{item.price}$</h4>
                </div>
              )}
               
            </div>
            <div className="button-card">
                    <button onClick={(event)=>addToCart(event,item._id)}>Add to Cart</button>
                  </div>
            </div>
            <div className="back">
            <button onClick={() => handleCardFlip(item._id)}>
            <i className="bx bx-x"></i>
          </button>
            <div className="popup">
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Discounts;