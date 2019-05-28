import React, {Component} from "react";
import {Toolbar} from "../page/Toolbar";
import {Wrapper} from "../page/Wrapper";
import {LeftBar} from "../page/LeftBar";
import {ContentContainer} from "../page/ContentContainer";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Toolbar items={["categorys", "banners"]}/>
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