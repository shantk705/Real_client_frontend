import React, { useState, useEffect } from "react";
import axios from 'axios';
import Items from '../items/items'
import '../items/cat.css'
import PopupItem from "../items/popupItem";
import swal from 'sweetalert';



function Cat() {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const[showPopup, setShowPopup]= useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [discount_per, setDiscount_per] = useState("");
  const [cat, setCat] = useState("");
  const [image, setImage] = useState("");

  

  const getcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cat/getcategory");
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getItemsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:5000/item/getitembycategory/${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //add new item
  const addItem = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("discount_per", discount_per);
    formData.append("category", cat);
    formData.append("image", image);
  
    try {
      console.log("abel l response")
      const response = await axios.post("http://localhost:5000/item/additem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("assalaaaaaaaaaaaaaaaaaaa")
      getItemsByCategory(selectedCategoryId);
      setShowPopup(false);
      swal({
        title: "Item added successfully!",
        icon: "success",
      });
      setName("");
      setDescription("");
      setPrice("");
      setWeight("");
      setDiscount_per("");
      setCat("");
      setImage(null);
    } catch (error) {
      console.error(error);
      swal({
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };
  

  useEffect(() => {
    getcategories();
  }, []);

  useEffect(() => {
    getItemsByCategory(selectedCategoryId);
  }, [selectedCategoryId]);

  const handleButtonClick = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("abel");
    addItem();
    console.log("ba3ed");
  };
  
  const handleAddItemButtonClick = () => {
    setShowPopup(true);
  };

  const handleCancelItemButtonClick = () => {
    setShowPopup(false);
    window.location.reload()
  };


  const handleImageChange = async (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);

  }

  const filteredCategory = selectedCategoryId === "" ? [] : products.filter((p) => p.categoryId === selectedCategoryId);


  return (
    <>
    <div className="category-container-dash">
      <div className="category-buttons-dash">
        {Array.isArray(category) && category.map((item, index) => (
          <button key={index} value={item._id} onClick={handleButtonClick} className={`category-button-dash ${selectedCategoryId === item._id ? "selected" : ""}`}>{item.name_category}</button>
       ))}
          <button onClick={handleAddItemButtonClick} className="category-button-dash"><span className="add-item-icon-dash">&#43;</span>Add Item</button>
              

<PopupItem
  trigger={showPopup}
  setTrigger={() => setShowPopup(false)}
>
  <div className="inputs-add-products">
    <label className="labels-input">Product Name: </label>
    <input
      type="text"
      name="name"
      className="input-name"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <label className="labels-input">Product Description: </label>
    <textarea
      name="description"
      className="input-name"
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <label className="labels-input">Product Weight (kg): </label>
    <input
      type="text"
      name="weight"
      className="input-name"
      id="weight"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />

    <label className="labels-input">Product Price ($):</label>
    <input
      type="text"
      name="price"
      className="input-name"
      id="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />

    <label className="labels-input">Discount (%):</label>
    <input
      type="text"
      name="discount_per"
      className="input-name"
      id="discount_per"
      value={discount_per}
      onChange={(e) => setDiscount_per(e.target.value)}
    />
    
    <label className="labels-input">Category</label>
    <select
      id="category"
      name="category"
      value={cat}
      onChange={(e) => setCat(e.target.value)}
      className="input-name"
    >
      <option value="">-- Select a category --</option>
      {Array.isArray(category) &&
        category.map((item, index) => (
          <option key={index} value={item._id}>
            {item.name_category}
          </option>
        ))}
    </select>

    <label className="labels-input">Product Image</label>
                <input
                  type="file"
                  className="product"
                  name="productImage"  
                  onChange={handleImageChange} 
                />
  </div>
  <div className="btn-pop-wrapper">
    <button className="btn-add-item" onClick={submitHandler}>
      Add
    </button>
    <button className="btn-cancel-item" onClick={handleCancelItemButtonClick}>
      Cancel
    </button>
  </div>
</PopupItem>


            {showPopup && (
        <PopupItem 
          onClose={() => setShowPopup(false)}
          reloadItems={() => getItemsByCategory()}
        />
      )}

      </div>
      {selectedCategoryId !== "" && <Items categoryId={selectedCategoryId} filteredCategory={filteredCategory} />}
    </div>
    </>
  );
}

export default Cat;
