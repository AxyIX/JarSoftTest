import React from "react";
import '../../styles/ContentContainer.css';

export const ContentContainer = (props) => {
  const {
    title,
    children
  } = props;

  return (
    <div className="container">
      <div className="container-title">
        {title ? title : ""}
      </div>
      <div className="container-content">
        {children}
      </div>
    </div>
  );
}