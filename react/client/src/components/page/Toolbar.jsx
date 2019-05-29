import React, {Component} from "react";
import App from "../app/App";
import '../../styles/Toolbar.css';
import {ToolbarItem} from "../common/ToolbarItem";

export class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: App.TOOLBAR_ELEMENTS[0]
    };
  }

  onClick = (tab) => {
    this.setState({
      currentTab: tab
    });
    this.props.onChange(tab);
  }

  render() {
    const {
      items
    } = this.props;

    const {
      currentTab
    } = this.state;

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