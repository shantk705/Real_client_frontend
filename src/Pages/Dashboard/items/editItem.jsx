import React, { useState } from 'react';
import axios from 'axios';
import '../items/editItem.css';

function EditItem(props) {
  let token=sessionStorage.getItem("token")

  const [name, setName] = useState(props.item.name);
  const [itemid, setItemid] = useState(props.item._id);
  const [description, setDescription] = useState(props.item.description);
  const [weight, setWeight] = useState(props.item.weight);
  const [price, setPrice] = useState(props.item.price);
  const [discountPer, setDiscountPer] = useState(props.item.discount_per);
  const [showPopup, setShowPopup] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDiscountPerChange = (event) => {
    setDiscountPer(event.target.value);
  };
  const config1 = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedItem = {
      name,
      description,
      weight,
      price,
      discount_per: discountPer,
    };
    try {
      await axios.put(`https://dayaa-backend.onrender.com/item/upditem/${itemid}`, updatedItem, config1);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popupItem-edit">
      <div className="popup-inner-edit">
        <div className='title-close-edit'>
          <h2 className='title-edit'>Edit Item</h2>
          <button className='close-item-btn-edit' onClick={() => window.location.reload()}>
            x
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="inputs-add-products-edit"> 
          <label className="labels-input-edit">Name:</label>
          <input type="text" id="name" value={name} className="input-name-edit" onChange={handleNameChange} />

          <label className="labels-input-edit">Description:</label>
          <textarea id="description" value={description} className="input-name-edit" onChange={handleDescriptionChange} />

          <label className="labels-input-edit">Weight (kg):</label>
          <input type="text" id="weight" value={weight} className="input-name-edit" onChange={handleWeightChange} />

          <label className="labels-input-edit">Price ($):</label>
          <input type="text" id="price" value={price} className="input-name-edit" onChange={handlePriceChange} />

          <label className="labels-input-edit">Discount (%):</label>
          <input type="text" id="discount-per" value={discountPer} className="input-name-edit" onChange={handleDiscountPerChange} />
          <button type="submit" className="btn-add-item">
         Save Changes
          </button>
      </form>
 </div>
 </div>
   );
 }

export default EditItem;

