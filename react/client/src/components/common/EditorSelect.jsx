import React, {Component} from "react";
import "../../styles/EditorInput.css";

export const EditorSelect = (props) => {
  return (
    <select defaultValue={props.value} className="editor-input">
      {props.items && props.items.map((item, key) => {
        return <option key={key} value={item.name}>{item.name}</option>
      })}
    </select>
  );
}