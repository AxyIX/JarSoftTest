import React from "react";
import '../../styles/Footer.css';

export const Footer = (props) => {
  return (
    <>
      <div className='vertical-space'/>
      <div className='footer'>
        {props.children}
      </div>
    </>
  );
};