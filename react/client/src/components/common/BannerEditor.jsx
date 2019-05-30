import React, {Component} from "react";
import {EditorInput} from "./EditorInput";
import {BANNER_FIELDS_TITLES} from "../app/Constants";
import {EditorFields} from "./EditorFields";
import {EditorTitles} from "./EditorTitles";
import '../../styles/BannerEditor.css';
import {EditorTextField} from "./EditorTextField";
import {Footer} from "./Footer";
import {EditorSelect} from "./EditorSelect";

export class BannerEditor extends Component {

  renderBannerEditor = (item) => {
    return <>
      <div className="banner-editor">
        <EditorTitles>
          {BANNER_FIELDS_TITLES}
        </EditorTitles>
        <EditorFields>
          <EditorInput value={item.name}/>
          <EditorSelect value={item.category} items={this.props.categories}/>
          <EditorInput value={item.price}/>
          <EditorTextField value={item.content}/>
        </EditorFields>
      </div>
      <Footer>
      </Footer>
    </>;
  }

  render() {

    const {
      item
    } = this.props;

    return item ? this.renderBannerEditor(item)
      :
      this.renderBannerEditor({name: "", category: "", price: "", content: ""});
  }
}