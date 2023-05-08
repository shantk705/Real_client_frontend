import React from "react";
import "../items/popupItem.css";

const PopupCarousel = (props) => {
  return props.trigger ? (
    <div className='popupItem'>
      <div className='popup-inner'>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupCarousel;