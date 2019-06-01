import React, {Component} from "react";
import {ContentContainer} from "../page/ContentContainer";
import {EditorTitles} from "./EditorTitles";
import {EditorFields} from "./EditorFields";
import {EditorInput} from "./EditorInput";
import {Notify} from "./Notify";
import {Footer} from "./Footer";
import {EditorButtons} from "./EditorButtons";
import {CATEGORY_FIELDS_TITLES} from "../app/Constants";
import {deleteBanner, deleteCategory, saveCategory} from "../API/API";

export class CategoryEditor extends Component {

  constructor(props) {
    super(props);

    if (props.item) {
      this.state = {
        category: {...props.item},
        error: ""
      };
    } else {
      this.state = {
        category: {
          name: "",
          reqName: ""
        },
        error: ""
      };
    }
    ;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.state.category) {
      this.setState(prev => ({
        ...prev,
        category: {...nextProps.item}
      }));
    }
  }

  onChange = (value, field) => {
    this.setState(prevState =>
      ({
        ...prevState,
        category: {...this.state.category, [field]: value}
      })
    );
  }

  onSave = () => {

    this.setState(prev => ({
      ...prev,
      error: ""
    }));

    const {
      category
    } = this.state;

    saveCategory(category).then(() => {
        this.props.onSave();
      }
    ).catch(e => {
      this.setState(prevState => ({
        ...prevState,
        error: e
      }));
    })
  }

  onDelete = () => {
    if (this.props.item.id) {
      deleteCategory(this.props.item.id).then(() => {
        this.props.onDelete();
      }).catch();
    } else {
      this.props.onDelete();
    }

  }


  render() {

    const {
      category,
      error
    } = this.state;

    const {
      item
    } = this.props;


    return <ContentContainer title={item.id ? (item.name + ' ID: ' + item.id) : 'Create new category'}>
      <div className="editor">
        <EditorTitles>
          {CATEGORY_FIELDS_TITLES}
        </EditorTitles>
        <EditorFields>
          <EditorInput id={'name'} value={category.name} onChange={this.onChange}/>
          <EditorInput id={'reqName'} value={category.reqName} onChange={this.onChange}/>
        </EditorFields>
      </div>
      <Notify error={error}/>
      <Footer>
        <EditorButtons onSave={this.onSave} onDelete={this.onDelete}/>
      </Footer>
    </ContentContainer>;
  }
}