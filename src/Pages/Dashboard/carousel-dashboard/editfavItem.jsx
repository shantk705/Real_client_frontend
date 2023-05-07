import React, { useState } from 'react';
import axios from 'axios';
import '../carousel-dashboard/editfavItem.css';

function EditfavItem(props) {
  let token=sessionStorage.getItem("token")

  const [name_fav, setName_fav] = useState(props.item.name_fav);
  const [itemid, setItemid] = useState(props.item._id);
  const [price_fav, setPrice_fav] = useState(props.item.price_fav);

  const handleNameChange = (event) => {
    setName_fav(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice_fav(event.target.value);
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
      name_fav,
      price_fav,
    };
    try {
      await axios.put(`https://dayaa-backend.onrender.com/fav/updfav/${itemid}`, updatedItem, config1);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popupItem-edit-car">
      <div className="popup-inner-edit-car">
        <div className='title-close-edit-car'>
          <h2 className='title-edit-car'>Edit Item</h2>
          <button className='close-item-btn-edit-car' onClick={() => window.location.reload()}>
            x
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="inputs-add-products-edit-car"> 
          <label className="labels-input-edit-car">Name:</label>
          <input type="text" id="name" value={name_fav} className="input-name-edit-car" onChange={handleNameChange} />

          <label className="labels-input-edit-car">Price ($):</label>
          <input type="text" id="price" value={price_fav} className="input-name-edit-car" onChange={handlePriceChange} />

          <button type="submit" className="btn-add-item-car">
         Save Changes
          </button>
      </form>
 </div>
 </div>
   );
 }

export default EditfavItem;

