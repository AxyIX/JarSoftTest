import React from "react";
import {Button} from "./Button";
import '../../styles/Editor.css';

export const EditorButtons = (props) => {
  return(
    <div className="editor-buttons-container">
      <Button text={'Save'} onClick={props.onSave}/>
      <div className="horizontal-space"/>
      <Button text={'Delete'} color={'red'} onClick={props.onDelete}/>
    </div>
  );
}