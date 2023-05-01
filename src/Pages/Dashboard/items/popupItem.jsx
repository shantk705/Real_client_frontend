import React from "react";
import "../items/popupItem.css";

const PopupItem = (props) => {
  return props.trigger ? (
    <div className='popupItem'>
      <div className='popup-inner'>
        <button className='close-item-btn' onClick={()=>(window.location.reload())}>
          {""}
         x
         
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupItem;