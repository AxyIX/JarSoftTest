import React from "react";
import '../../styles/Editor.css';

export const EditorTitles = (props) => {
  return (
    <div className="editor-items-container">
      {props.children && props.children.map((item, key) => {
        return <div key={key} className="editor-item">
          {item}
        </div>;
      })}
    </div>
  );
};