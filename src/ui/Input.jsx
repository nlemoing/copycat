import React from "react";
import PropTypes from "prop-types";

import { trackChanges } from "./trackChanges";

import "./styles.css";

const Input = props => {
  return (
    <span
      contentEditable
      id={`kk-input-element-${props.id}`}
      className="kk-input-element"
      onInput={e => trackChanges(props.id, e.target.innerText)}
      suppressContentEditableWarning
    >
      {props.children}
    </span>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Input;
