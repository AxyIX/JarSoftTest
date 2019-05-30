import React, {Component} from "react";
import {Toolbar} from "../page/Toolbar";
import {Wrapper} from "../page/Wrapper";
import {LeftBar} from "../page/LeftBar";
import {ContentContainer} from "../page/ContentContainer";
import {loadBanners, loadCategories} from "../API/API";
import {BannerEditor} from "../common/BannerEditor";
import axios from "axios";

class App extends Component {

  static TOOLBAR_ELEMENTS = [
    "Banners",
    "Categories"
  ]

  constructor(props) {
    super(props);

    this.state = {
      currentTab: App.TOOLBAR_ELEMENTS[0],
      leftBarItems: [],
      categories: []
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
        axios.all([
          loadBanners(),
          loadCategories()
        ]).then((data) => {
          this.setState({
            leftBarItems: data[0],
            categories: data[1]
          });
        }).catch((e)=> { console.log(e); });
        break;

      case App.TOOLBAR_ELEMENTS[1]:
        this.setState({
          leftBarItems: []
        });
        loadCategories().then(categories => {
          this.setState({
            leftBarItems: categories
          });
        }).catch((e)=> { console.log(e); });
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
      currentTab,
      categories
    } = this.state;

    return (
      <Wrapper>
        <Toolbar currentTab={currentTab} items={App.TOOLBAR_ELEMENTS} onChange={this.onTabChange}/>
        <Wrapper horizontal>
          <LeftBar title={currentTab} items={leftBarItems}/>
          <ContentContainer title={"asdasda"}>
            <BannerEditor categories={categories}/>
          </ContentContainer>
        </Wrapper>
      </Wrapper>
    );
  }
}

export default App;