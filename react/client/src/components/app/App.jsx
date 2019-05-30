import React, {Component} from "react";
import {Toolbar} from "../page/Toolbar";
import {Wrapper} from "../page/Wrapper";
import {LeftBar} from "../page/LeftBar";
import {loadBanners, loadCategories} from "../API/API";
import {BannerEditor} from "../common/BannerEditor";

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
      categories: [],
      item: null
    };
  }

  componentDidMount() {
    this.loadData(this.state.currentTab);
  }

  reloadData = () => {
    this.loadData(this.state.currentTab);
  }

  loadData = (tab) => {
    switch (tab) {
      case App.TOOLBAR_ELEMENTS[0]:
        this.setState({
          leftBarItems: []
        });
        loadBanners().then((data) => {
          this.setState({
            leftBarItems: data
          });
        }).catch((e) => {
          console.log(e);
        });
        break;

      case App.TOOLBAR_ELEMENTS[1]:
        this.setState({
          leftBarItems: []
        });
        loadCategories().then(categories => {
          this.setState({
            leftBarItems: categories
          });
        }).catch((e) => {
          console.log(e);
        });
        break;
    }
  }

  onTabChange = (tab) => {
    this.setState({currentTab: tab});
    this.loadData(tab);
  }

  renderEditor() {
    switch (this.state.tab) {
      case App.TOOLBAR_ELEMENTS[0]:
        if (this.state.item){
          return <BannerEditor item={this.state.item} onSave={this.reloadData} categories={this.state.categories}/>
        }
        break;
      case App.TOOLBAR_ELEMENTS[1]:
        break;
    }
    return null;
  }

  onItemClick = (item) => {
    if (item) {
      this.setState(prev=>({

      }));
    }
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
          <LeftBar title={currentTab} items={leftBarItems} onItemClick={this.onItemClick}/>
          {
            this.renderEditor()
          }
        </Wrapper>
      </Wrapper>
    );
  }
}

export default App;