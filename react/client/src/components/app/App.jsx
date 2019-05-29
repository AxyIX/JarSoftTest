import React, {Component} from "react";
import {Toolbar} from "../page/Toolbar";
import {Wrapper} from "../page/Wrapper";
import {LeftBar} from "../page/LeftBar";
import {ContentContainer} from "../page/ContentContainer";
import {loadBanners, loadCategories} from "../API/API";

class App extends Component {

  static TOOLBAR_ELEMENTS = [
    "Banners",
    "Categories"
  ]

  constructor(props) {
    super(props);

    this.state = {
      currentTab: App.TOOLBAR_ELEMENTS[0],
      leftBarItems: []
    };
  }

  componentDidMount() {
    this.loadData(this.state.currentTab);
  }

  loadData = (tab) => {
    switch (tab) {
      case App.TOOLBAR_ELEMENTS[0]:
        this.setState({
          leftBarItems: []
        });
        loadBanners().then(data => {
          this.setState({
            leftBarItems: data
          });
        });
        break;
      case App.TOOLBAR_ELEMENTS[1]:
        this.setState({
          leftBarItems: []
        });
        loadCategories().then(data => {
          this.setState({
            leftBarItems: data
          });
        });
        break;
    }
  }

  onTabChange = (tab) => {
    this.setState({currentTab: tab});
    this.loadData(tab);
  }

  onItemChange = () => {

  }

  render() {

    const {
      leftBarItems,
      currentTab
    } = this.state;

    return (
      <Wrapper>
        <Toolbar currentTab={currentTab} items={App.TOOLBAR_ELEMENTS} onChange={this.onTabChange}/>
        <Wrapper horizontal>
          <LeftBar title={currentTab} items={leftBarItems}/>
          <ContentContainer title={"asdasda"}>

          </ContentContainer>
        </Wrapper>
      </Wrapper>
    );
  }
}

export default App;