import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./carousel-dash.css";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import PopupCarousel from "./popupcarousel";
import EditfavItem from "./editfavItem";

function Favorites() {
  const [favorite, setFavorite] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [name_fav, setName_fav] = useState("");
  const [price_fav, setPrice_fav] = useState("");
  const [image_fav, setImage_fav] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

 

  //get items again
  const loadclass = async () => {
    const res = await axios.get("http://localhost:5000/fav/getfav");
    setFavorite(res.data);
  };

  //delete item
  const deleteUser = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          className: "btn-danger",
          visible: true,
          closeModal: true,
          className: "orange-button",
        },
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:5000/fav/delfav/${id}`);
        loadclass();
        swal("Poof! The item has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The item is safe!");
      }
    });
  };

  //add new item as fav
   const addfav = async () => {
    const formData = new FormData();
    formData.append("name_fav", name_fav);
    formData.append("price_fav", price_fav);
    formData.append("image_fav", image_fav);
  
    try {
      console.log("abel l response")
      const response = await axios.post("http://localhost:5000/fav/addfav", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("assalaaaaaaaaaaaaaaaaaaa")
      setShowPopup(false);
      swal({
        title: "Item added successfully!",
        icon: "success",
      });
      setName_fav("");
      setPrice_fav("");
      setImage_fav(null);
    } catch (error) {
      console.error(error);
      swal({
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };

    ////// edit fav item
    const editfavItem = async (id) => {
        try {
          await axios.put(`http://localhost:5000/fav/updfav/${id}`);
         loadclass();
          setShowEditPopup(false);
          swal("The item has been updated!", {
            icon: "success",
          });
        } catch (error) {
          console.error(error);
        }
      };
    
       // open the EditItemPopup component with the selected item
    const handleEditButtonClick = (item) => {
        setSelectedItem(item);
        setShowEditPopup(true);
      };
    
      // close the EditItemPopup component
      const handleEditPopupClose = (newItem) => {
        editfavItem(selectedItem._id, newItem);
      };




  useEffect(() => {
    loadclass();
  }, []);

  useEffect(() => {
    loadclass();
  }, [showPopup]);

const submitHandler = (e) => {
    e.preventDefault();
    console.log("abel");
    addfav();
    console.log("ba3ed");
  };

const handleAddItemButtonClick = () => {
    setShowPopup(true);
  };

  const handleImageChange = async (event) => {
    event.preventDefault();
    setImage_fav(event.target.files[0]);
  }

  return (
    <div className="">
<div>
          <button onClick={handleAddItemButtonClick}><span className="add-item-icon-dash-carousel">&#43;</span>Add Favorite Item</button>
          <PopupCarousel
  trigger={showPopup}
  setTrigger={() => setShowPopup(false)}
>

  <div className="inputs-add-products-carousel">
    <label className="labels-input-carousel">Product Name: </label>
    <input
      type="text"
      name="name"
      className="input-name-carousel"
      id="name"
      value={name_fav}
      onChange={(e) => setName_fav(e.target.value)}
    />


    <label className="labels-input-carousel">Product Price ($):</label>
    <input
      type="text"
      name="price"
      className="input-name-carousel"
      id="price"
      value={price_fav}
      onChange={(e) => setPrice_fav(e.target.value)}
    />

  

    <label className="labels-input-carousel">Product Image</label>
                <input
                  type="file"
                  className="product"
                  name="productImage"  
                  onChange={handleImageChange} 
                />
  </div>
  <button className="btn-add-item-carousel" onClick={submitHandler}>
    Add Item
  </button>
</PopupCarousel>
</div>
      <table className="table-item-carousel">
        <thead>
          <tr className="first-item--">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(favorite) &&
            favorite.map((item, index) => {
              return (
                <tr className="" key={index}>
                  <td className="item-image-carousel">
                    {" "}
                    <img src={item.image_fav.url} alt="product is not displaying" />
                  </td>
                  <td className="item-name"> {item.name_fav} </td>
                  <td>{item.price_fav}</td>
                  <td>
                    {" "}
                    <button
                      alt=""
                      className="button-delete-item-carousel"
                      onClick={() => deleteUser(item._id)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                  <td>
                    <button
                      className="button-edit-item"
                      onClick={() => handleEditButtonClick(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {showPopup && (
        <PopupCarousel
          onClose={() => setShowPopup(false)}
          reloadItems={() => loadclass()}
        />
      )}

{showEditPopup && (
    <EditfavItem
        onClose={handleEditPopupClose}
        item={selectedItem}
        onEdit={(newItem) => editfavItem(selectedItem._id, newItem)}
    />
)}
    </div>
  );
}
export default Favorites;
