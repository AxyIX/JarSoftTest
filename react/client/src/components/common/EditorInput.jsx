import React from "react";
import "../../styles/EditorInput.css";

export const EditorInput = (props) => {

  const onChange = (event) => {
    props.onChange(event.target.value, props.id);
  };

    const {
      value,
      id
    } = props;

    return (
      <input type={"text"} id={id} className='editor-input' value={value} onChange={(e)=>onChange(e)}/>
    );
};