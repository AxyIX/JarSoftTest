import React, {Component} from "react";
import {EditorInput} from "./EditorInput";
import {BANNER_FIELDS_TITLES} from "../app/Constants";
import {EditorFields} from "./EditorFields";
import {EditorTitles} from "./EditorTitles";
import '../../styles/BannerEditor.css';
import {EditorTextField} from "./EditorTextField";
import {Footer} from "./Footer";
import {CategorySelector} from "./CategorySelector";
import {EditorButtons} from "./EditorButtons";
import {loadCategories, saveBanner} from "../API/API";
import {Notify} from "./Notify";
import {ContentContainer} from "../page/ContentContainer";

export class BannerEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      banner:{
        name: "",
        price: "",
        content: "",
        category: ""
      },
      categories:[],
      error: ""
    }
  }

  componentWillMount() {
    const {
      item
    } = this.props;
    loadCategories().then(data=>{
      if (data && data.length > 0){
        this.setState(prevState=>({
          ...prevState,
          banner: {...this.state.banner, category: item && item.category || data[0].id},
          categories: data
        }));
      }
    }).catch()
  }

  onChange = (value, field) => {
    this.setState(prevState =>
      ({
        ...prevState,
        banner: {...this.state.banner, [field]: value}
      })
    );
  }

  onSave = () => {

    const {
      name,
      price,
      content,
      category
    } = this.state.banner;

    this.setState(prev=>({
      ...prev,
      error: ""
    }))

    saveBanner({
      name,
      price,
      content
    }, category).then(
      () => {
        this.props.onSave();
      }
    ).catch(e => {
      this.setState(prevState => ({
        ...prevState,
        error: e
      }));
    });
  }

  renderBannerEditor = (item) => {
    return <ContentContainer title={this.props.item ? (item.name + ' ID: ' + item.id) : 'Create new banner'}>
      <div className="banner-editor">
        <EditorTitles>
          {BANNER_FIELDS_TITLES}
        </EditorTitles>
        <EditorFields>
          <EditorInput id={'name'} value={item.name || ""} onChange={this.onChange}/>
          <EditorInput id={'price'} value={item.price || ""} onChange={this.onChange}/>
          <CategorySelector id={'category'} value={item.category} items={this.state.categories}
                            onChange={this.onChange}/>
          <EditorTextField id={'content'} value={item.content || ""} onChange={this.onChange}/>
        </EditorFields>
      </div>
      <Notify error={this.state.error}/>
      <Footer>
        <EditorButtons onSave={this.onSave}/>
      </Footer>
    </ContentContainer>;
  }

  render() {

    const {
      item
    } = this.props;

    return item ? this.renderBannerEditor(item)
      :
      this.renderBannerEditor(this.state.banner);
  }
}