import React from "react";
import "../../styles/EditorInput.css";

export const EditorTextField = (props) => {
  return (
    <textarea className='editor-textarea' defaultValue={props.value} />
  );
}