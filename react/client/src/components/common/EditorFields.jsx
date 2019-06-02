import React from "react";
import '../../styles/Editor.css';

export const EditorFields = (props) => {
  return (
    <div className="editor-fields">
      {props.children && props.children.map((item, key) => {
        return <div key={key} className="editor-item">
          {item}
        </div>;
      })}
    </div>
  );
};