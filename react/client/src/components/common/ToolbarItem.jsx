import React from "react";
import classNames from "classnames";
import {ReactComponent as Triangle} from "../../icon/triangle.svg";
import '../../styles/ToolbarItem.css';

export const ToolbarItem = (props) => {

    const {
        title,
        onClick,
        id,
        isChosen
    } = props;

    return(
        <div className={classNames("toolbar-item", isChosen ? "toolbar-item-chosen" : "")} onClick={() => onClick(id)}>
            <div className="triangle-container">
                {isChosen ? <Triangle/> : null}
            </div>
            {title}
        </div>
    );
}