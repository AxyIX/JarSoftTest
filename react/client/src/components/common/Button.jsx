import React from "react";
import classNames from 'classnames';
import '../../styles/Button.css';

export const Button = (props) => {

  const {
    text,
    color,
    children,
    onClick,
    full
  } = props;

  const getColorStyle = () => {
    switch (color) {
      case 'red':
        return 'button-red';
      case 'blue':
        return 'button-blue';
      default:
        return 'button-black';
    }
  };

  return <button className={classNames('button', getColorStyle(), full ? 'button-full' : "")} onClick={onClick}>{text ? text : children}</button>
};