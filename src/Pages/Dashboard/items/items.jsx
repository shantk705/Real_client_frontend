import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../items/items.css";
import swal from "sweetalert";
import PopupItem from "../items/popupItem";
import { useNavigate } from "react-router";
import EditItem from "../items/editItem";
import { get } from "react-hook-form";

function Items(props) {
  let token=sessionStorage.getItem("token")

  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { categoryId,refresh } = props;
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();



  const getProducts = useCallback(async () => {
    try {
      
      if (categoryId === "") {
        const response = await axios.get("https://dayaa-backend.onrender.com/item/items/${categoryId}");
        setItems(response.data);
      } else {
        const response = await axios.get(
          `https://dayaa-backend.onrender.com/item/items/${categoryId}`
        );
        setItems(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [categoryId]);


  const config1 = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
       
        },
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`https://dayaa-backend.onrender.com/item/delitem/${id}`, config1);
        getProducts(categoryId);
        swal("Poof! The item has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The item is safe!");
      }
    });
  };

  // edit item
  const editItem = async (id) => {
    try {
      const response = await axios.put(`https://dayaa-backend.onrender.com/item/upditem/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      getProducts();
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
      editItem(selectedItem._id, newItem);
    };

  useEffect(() => {
    getProducts();
  }, [categoryId,refresh]);

  return (
    <div className="tbl-wrper">
      <table className="table-item">
        <thead>
          <tr className="first-item--">
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Discounted %</th>
            <th>New Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(items) &&
            items.map((item, index) => {
              return (
                <tr className="" key={index}>
                  <td className="item-image">
                    {" "}
                    <img src={item.image.url} alt="product is not displaying" />
                  </td>
                  <td className="item-name"> {item.name} </td>
                  <td className="item-desc">{item.description}</td>
                  <td>{item.weight}</td>
                  <td>{item.price}</td>
                  <td>{item.discount_per}</td>
                  <td>{item.price_after_discount}</td>
                  <td>
                    {" "}
                    <button
                      alt=""
                      className="button-delete-item"
                      onClick={() => deleteUser(item._id)}
                    >
                      {" "}
                      {" "}
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
        <PopupItem
          onClose={() => setShowPopup(false)}
          reloadItems={() => getProducts()}
        />
      )}

{showEditPopup && (
    <EditItem
        onClose={handleEditPopupClose}
        item={selectedItem}
        onEdit={(newItem) => editItem(selectedItem._id, newItem)}
    />
)}
    </div>
  );
}
export default Items;
