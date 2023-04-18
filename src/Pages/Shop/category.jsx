import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Shop/category.css'; // Import your CSS file
import { Link } from "react-router-dom";
import Shop from '../Shop/shop';


function Category() {
  const [category, setCategory] = useState([]);
  const [all, setAll] = useState([]);

  

  const getcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cat/getcategory");
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getcategories();
  }, []);

  return (
    <div className="category-container">
    {category && category.map((item, index) => (
      <div className="category-card" key={index}>
        <div className="category-product">
          {item.image_category?.url && (
            <Link to={`/shop/${item._id}`  }key={item._id}>
             <img src={item.image_category.url} alt={item.name_category} />
             </Link>
          )}
          <h3>{item.name_category}</h3>
        </div>
      </div>
    ))}
  </div>
  );
  
}

export default Category;
