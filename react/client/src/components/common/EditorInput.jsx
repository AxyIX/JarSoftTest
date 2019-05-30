import React, {Component} from "react";
import "../../styles/EditorInput.css";

export class EditorInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  onChange = (e) => {

  }

  render() {
    const {
      value,
      id
    } = this.props;
    return (
      <input type={"text"} id={id} className='editor-input' defaultValue={value} onChange={(e) => this.onChange(e)}/>
    );
  }
}