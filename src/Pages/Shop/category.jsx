// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';
// // import '../Shop/category.css'; // Import your CSS file
// // import Shop from '../Shop/shop';
// // import { get } from "react-hook-form";

// // function Category() {
// //   const [category, setCategory] = useState([]);
// //   const [selectedCategoryId, setSelectedCategoryId] = useState("");
// //   const [products, setProducts] = useState("");

// //   const getcategories = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5000/cat/getcategory");
// //       setCategory(response.data);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   }

// //   const getallitems= async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5000/item/getitem");
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   }

// //   useEffect(() => {
// //     getcategories();
// //   }, []);

// //   // useEffect(() => {
// //   //   // if (category.length > 0) {
// //   //   //   setSelectedCategoryId(category[0]._id);
// //   //   // }
// //   // }, [category]);
 


// //   const handleDropdownChange = (e) => {
// //     const categoryId = e.target.value;
// //     setSelectedCategoryId(categoryId);
// //   }

// //   const filteredCategory = selectedCategoryId === "" ? category : category.filter((c) => c._id === selectedCategoryId);
// //   // const filteredCategory = category;


// //   return (
// //     <div className="category-container">
// //       <select value={selectedCategoryId} onChange={handleDropdownChange} className="category-select">
// //         <option value=""> All Products</option>
// //         {category.map((item, index) => (
// //           <option key={index} value={item._id}>{item.name_category}</option>
// //         ))}
// //       </select>

// //       <Shop categoryId={selectedCategoryId} filteredCategory={filteredCategory} />
// //     </div>
// //   );
// // }

// // export default Category;

// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import '../Shop/category.css'; // Import your CSS file
// import Shop from '../Shop/shop';
// import { get } from "react-hook-form";

// function Category() {
//   const [category, setCategory] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");
//   const [products, setProducts] = useState("");

//   const getcategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/cat/getcategory");
//       setCategory(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getcategories();

//   }, []);

//   const handleDropdownChange = async (e) => {
//     const categoryId = e.target.value;
//     setSelectedCategoryId(categoryId);
  
//   }
//   const filteredCategory = selectedCategoryId === "" ? products : category.filter((c) => c._id === selectedCategoryId);

//   return (
//     <div className="category-container">
//       <select value={selectedCategoryId} onChange={handleDropdownChange} className="category-select">
//         <option value=""> All Products</option>
//         {category.map((item, index) => (
//           <option key={index} value={item._id}>{item.name_category}</option>
//         ))}
//       </select>

//       <Shop categoryId={selectedCategoryId} filteredCategory={filteredCategory} />
//     </div>
//   );
// }

// export default Category;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Shop/category.css'; // Import your CSS file
import Shop from '../Shop/shop';
import { get } from "react-hook-form";

function Category() {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState("");

  const getcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cat/getcategory");
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getallitems= async () => {
    try {
      const response = await axios.get("http://localhost:5000/item/getitem");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getcategories();
    getallitems();
  }, []);

  const handleButtonClick = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
  }

  const filteredCategory = selectedCategoryId === "" ? products : category.filter((c) => c._id === selectedCategoryId);

  return (
    <div className="category-container">

    <div className="category-buttons">
    <button value="" onClick={handleButtonClick} className={`category-button ${selectedCategoryId === "" ? "selected" : ""}`}>All Products</button>
    {category.map((item, index) => (
    <button key={index} value={item._id} onClick={handleButtonClick} className={`category-button ${selectedCategoryId === item._id ? "selected" : ""}`}>{item.name_category}</button>
  ))}
</div>
      <Shop categoryId={selectedCategoryId} filteredCategory={filteredCategory} />
    </div>
  );
}

export default Category;


