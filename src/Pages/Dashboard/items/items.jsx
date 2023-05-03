import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../items/items.css";
import swal from "sweetalert";
import PopupItem from "../items/popupItem";
import { useNavigate } from "react-router";
import EditItem from "../items/editItem";

function Items(props) {
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { categoryId } = props;
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    try {
      console.log(categoryId);
      if (categoryId === "") {
        const response = await axios.get("http://localhost:5000/item/getitem");
        setItems(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:5000/item/items/${categoryId}`
        );
        setItems(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [categoryId]);

  //get items again
  const loadclass = async () => {
    const res = await axios.get("http://localhost:5000/item/getitem");
    setItems(res.data);
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
        await axios.delete(`http://localhost:5000/item/delitem/${id}`);
        loadclass();
        swal("Poof! The item has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The item is safe!");
      }
    });
  };

  ////// edit item
  const editItem = async (id) => {
    try {
      await axios.put(`http://localhost:5000/item/upditem/${id}`);
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
  }, [getProducts]);

  useEffect(() => {
    loadclass();
  }, [showPopup]);

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
          reloadItems={() => loadclass()}
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
