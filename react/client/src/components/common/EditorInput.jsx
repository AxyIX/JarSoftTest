import React, {Component} from "react";
import "../../styles/EditorInput.css";

export class EditorInput extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (event) => {
    this.props.onChange(event.target.value, this.props.id);
  }

  render() {
    const {
      value,
      id
    } = this.props;
    return (
      <input type={"text"} id={id} className='editor-input' defaultValue={value} onChange={(e)=>this.onChange(e)}/>
    );
  }
}