import React from "react";
import '../../styles/LeftBarItem.css';

export const LeftBarItem = (props) => {
  const {
    item
  } = props;

  return (
    <div className="left-bar-item">
      <span onClick={()=>props.onClick(item)}>{item.name}</span>
    </div>
  );
};