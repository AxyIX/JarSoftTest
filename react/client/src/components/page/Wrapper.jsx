import React from "react";
import classNames from "classnames";
import '../../styles/Wrapper.css';

export const Wrapper = (props) => {

  const {
    horizontal
  } = props;

  if (horizontal) {
    return (
      <div className="wrapper-horizontal">
        {props.children}
      </div>
    );
  }

  return (
    <div className={classNames("wrapper")}>
      {props.children}
    </div>
  );
};