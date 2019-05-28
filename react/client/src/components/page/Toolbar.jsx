import React, {Component} from "react";
import '../../styles/Toolbar.css';
import {ToolbarItem} from "../common/ToolbarItem";

export class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: 0
    };
  }

  onClick = (index) => {
    this.setState({
      chosen: index
    });
  }

  render() {
    const {
      items
    } = this.props;

    const {
      chosen
    } = this.state;

    return (
      <div>
        <div className="toolbar">
          {
            items ? items.map((item, i) => {
                return <ToolbarItem key={i} id={i} title={item} onClick={this.onClick} isChosen={chosen === i ? true : null}/>
              })
              :
              null
          }
        </div>
      </div>
    );
  }
}