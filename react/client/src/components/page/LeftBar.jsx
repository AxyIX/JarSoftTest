'throwIfNamespace'
import React, {Component} from "react";
import "../../styles/LeftBar.css";
import {ReactComponent as Search} from "../../icon/search.svg";
import {LeftBarItem} from "../common/LeftBarItem";

export class LeftBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ""
    };
  }

  onChangeFilter = (e) => {
    this.setState({
      filter: e.target.value
    });
  }

  onClickItem = (item) => {

  }

  render() {

    const {
      title,
      items
    } = this.props;

    return (
      <div className="left-bar">
        <div className="left-bar-title">
          {title ? (title + ":") : ""}
        </div>
        <div className="left-bar-input">
          <div className="search-icon-container">
            <Search/>
          </div>
          <input type={"text"} id={"filter"} name={"filter"} onChange={this.onChangeFilter}
                 placeholder={"Enter " + title.toLowerCase() + " name"}/>
        </div>
        <div className="left-bar-items">
          {
            items && items.length > 0 ? items.filter((item, i) => {
              return item.name.toLowerCase().includes(this.state.filter.toLowerCase());
            }).map((item, i) => {
              return <LeftBarItem key={i} item={item} onClick={this.onClickItem}/>;
            })
              :
              <div className="left-bar-load">{"loading..."}</div>
          }
        </div>
      </div>
    );
  }
}