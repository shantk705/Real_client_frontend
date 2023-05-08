import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Discounts/discount.css'
import '../Shop/shop.css'; 
import swal from 'sweetalert';
import { useNavigate } from "react-router";
import Loader from "../../Components/Loader/Loader";

function Discounts(props) {
  let id=sessionStorage.getItem("user_id")
  let token=sessionStorage.getItem("token")
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [product, setProduct] = useState([]);
  const [single, setSingle] = useState([]);
  const [flippedItem, setFlippedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { categoryId } = props;
 
  const getdiscounts = async () => {
    try {
      const response = await axios.get(`https://dayaa-backend.onrender.com/item/getdiscount`);
      setProduct(response.data);
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getsingleproduct = async (id) => {
    try {
      const response = await axios.get(`https://dayaa-backend.onrender.com/item/getitem/${id}`);
      setSingle(response.data);
      setShowPopup(true);
      setItem(response.data);
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
    if(token &&id){
    let key= props
    
    axios.post(`https://dayaa-backend.onrender.com/cart/${id}`,{productId:key},{
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`,},
      })
    .then((res) => {
      if(res.status===201){
     
        swal({
          title: "Item added to cart!",
          icon: "success",
          buttons: {
            cancel: "Continue Shopping",
            confirm: {
              text: "See Cart",
              value: "cart",
              className: "swal-button"
            },
          },
          customClass: {
            confirmButton: "swal-button-center",
            container: "my-custom-container-class",
          },
        }).then((value) => {
          if (value === "cart") {
            window.location.href = "/cart";
          } 
        });
      
      }
      
    })
    .catch((err) => {
      swal({
        title: "Something went wrong ! please try again",
        icon: "error",
        buttons: {
          cancel: "Continue Shopping",
          confirm: {
            text: "See Cart",
            value: "cart",
            className: "swal-button"
          },
        },
        customClass: {
          confirmButton: "swal-button-center",
          container: "my-custom-container-class",
        },
      }).then((value) => {
        if (value === "cart") {
          window.location.href = "/cart";
        } 
      });
    });
  }else{navigate("/login")}
  }

  if (!item) {
    return (
    <>
      <Loader />
    </>
    )
  }
  return (
    <>
      <div className="text-discount">
        <h2>Discounted Items</h2>
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
            <button onClick={() => navigate("/single", { state: { id: item._id } })}>Details</button>
        <button onClick={(event) => {addToCart(event,item._id); }}>Add to Cart</button>

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