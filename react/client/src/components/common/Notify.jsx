import React from "react";
import '../../styles/Notify.css';

export const Notify = (props) => {
  return (
    <div className={'notify-container'}>
      {
        props.error &&
        <div className={'notify-content-error'}>
          {props.error}
        </div>
      }
    </div>
  );
}