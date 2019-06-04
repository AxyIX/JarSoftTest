import React, {Component} from "react";
import '../../styles/Toolbar.css';
import {ToolbarItem} from "../common/ToolbarItem";

export class Toolbar extends Component {
  onClick = (tab) => {
    if (tab !== this.props.currentTab){
      this.props.onChange(tab);
    }
  };

  render() {
    const {
      items,
      currentTab
    } = this.props;

    return (
      <div>
        <div className="toolbar">
          {
            items ? items.map((item, i) => {
                return <ToolbarItem key={i} id={i} title={item} onClick={this.onClick} isChosen={currentTab === item ? true : null}/>
              })
              :
              null
          }
        </div>
      </div>
    );
  }
}