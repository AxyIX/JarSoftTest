import React from "react";
import "../../styles/EditorInput.css";

export const EditorTextField = (props) => {

  const onChange = (event) => {
    props.onChange(event.target.value, props.id);
  };

  return (
    <textarea id={props.id} className='editor-textarea' value={props.value} onChange={e=>onChange(e)} />
  );
};