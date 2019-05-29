import React, {Component} from "react";
import {Toolbar} from "../page/Toolbar";
import {Wrapper} from "../page/Wrapper";
import {LeftBar} from "../page/LeftBar";
import {ContentContainer} from "../page/ContentContainer";
import {loadBanners, loadCategories} from "../../API";

class App extends Component {

  static TOOLBAR_ELEMENTS = [
    "Banners",
    "Categories"
  ]

  loadData = (tab) => {
    switch (tab) {
      case App.TOOLBAR_ELEMENTS[0]:
        this.setState({
          leftBarItems: loadBanners()
        });
        break;
      case App.TOOLBAR_ELEMENTS[1]:
        this.setState({
          leftBarItems: loadCategories()
        });
        break;
    }
  }

  onTabChange = (tab) => {
    this.loadData(tab);
  }

  render() {
    return (
      <Wrapper>
        <Toolbar items={App.TOOLBAR_ELEMENTS} onChange={this.onTabChange} />
        <Wrapper horizontal>
          <LeftBar title={"dro"} items={["hooh","lalalal","sdawfwegwg","dfweff"]}/>
          <ContentContainer title={"asdasda"}>

          </ContentContainer>
        </Wrapper>
      </Wrapper>
    );
  }
}

export default App;