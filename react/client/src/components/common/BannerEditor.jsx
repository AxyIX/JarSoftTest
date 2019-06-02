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
import {deleteBanner, loadCategories, saveBanner} from "../API/API";
import {Notify} from "./Notify";
import {ContentContainer} from "../page/ContentContainer";

export class BannerEditor extends Component {

  constructor(props) {
    super(props);

    if (props.item) {
      this.state = {
        banner: {...props.item},
        categories: [],
        error: ""
      };
    } else {
      this.state = {
        banner: {
          name: "",
          price: "",
          content: "",
        },
        categories: [],
        error: ""
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.state.banner) {
      this.setState(prev => ({
        ...prev,
        banner: {...nextProps.item}
      }));
    }
  }

  componentWillMount() {
    const {
      item
    } = this.props;
    loadCategories().then(data => {
      if (data && data.length > 0) {
        this.setState(prevState => ({
          ...prevState,
          banner: {...this.state.banner, category: item && item.category && item.category.id || data[0].id},
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
  };

  onSave = () => {

    const {
      id,
      name,
      price,
      content,
      category
    } = this.state.banner;

    this.setState(prev => ({
      ...prev,
      error: ""
    }));

    saveBanner({
      id,
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
  };

  onDelete = () => {
    if (this.props.item.id) {
      deleteBanner(this.props.item.id).then(() => {
        this.props.onDelete();
      }).catch();
    } else {
      this.props.onDelete();
    }
  };


  render() {

    const {
      banner,
      categories,
      error,
    } = this.state;

    const {
      item
    } = this.props;


    return <ContentContainer title={item.id ? (item.name + ' ID: ' + item.id) : 'Create new banner'}>
      <div className="editor">
        <EditorTitles>
          {BANNER_FIELDS_TITLES}
        </EditorTitles>
        <EditorFields>
          <EditorInput id={'name'} value={banner.name} onChange={this.onChange}/>
          <EditorInput id={'price'} value={banner.price} onChange={this.onChange}/>
          <CategorySelector id={'category'} value={banner.category} items={categories}
                            onChange={this.onChange}/>
          <EditorTextField id={'content'} value={banner.content} onChange={this.onChange}/>
        </EditorFields>
      </div>
      <Notify error={error}/>
      <Footer>
        <EditorButtons onSave={this.onSave} onDelete={this.onDelete}/>
      </Footer>
    </ContentContainer>;
  }
}