import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./single.css"
import Loader from "../../Components/Loader/Loader";
import swal from 'sweetalert';

function Single() {
  const [item, setItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/item/getitem/${location.state.id}`
        );
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [location.state.id]);

  function addToCart(event, props){
    let id= props
    axios.post(`http://localhost:5000/cart/64332eb3dfcb091305c650e8`,{productId:id},{
        headers: { "Content-Type": "application/json",},
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
  }

  if (!item) {
    return (
    <>
      <Loader />
    </>
    );
  }

  return (
    <div className="single-item">
      <div className="s-left">
        <img src={item.image.url} alt="product is not displaying" />
      </div>
      <div className="s-right">
        <h1><span>Name:</span> {item.name}</h1>
        <p><span>Description:</span> <br></br>{item.description}</p>
        <h3><span>Weight:</span> {item.weight}kg</h3>
        <div className="s-price">
          {item.price === item.price_after_discount ? (
            <h4><span>Price:</span> {item.price}$</h4>
          ) : (
            <div className="s-price">
              <h3><span>Discounted price:</span> {item.price_after_discount}$</h3>
              <h4><span>Price:</span> {item.price}$</h4>
            </div>
          )}
        </div>
        <button  onClick={(event) => {
        addToCart(event,item._id);
        
        }}className="s-btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default Single;
