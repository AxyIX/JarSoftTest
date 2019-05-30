import React from "react";
import "../../styles/EditorInput.css";

export const CategorySelector = (props) => {

  const onChange = (event) => {
    props.onChange(event.target.value, props.id);
  }

  return (
    <select id={props.id}
            defaultValue={props.value}
            className="editor-input"
            onChange={e=>onChange(e)}>
      {props.items && props.items.map((item, key) => {
        return <option key={key} value={item.id}>{item.name}</option>
      })}
    </select>
  );
}