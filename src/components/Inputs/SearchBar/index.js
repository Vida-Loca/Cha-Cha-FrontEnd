/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import PropTypes from "prop-types";

import "./searchbar.scss";

const SearchBar = ({
  name, placeholder, onChange, disabled, value, clicked,
}) => (
  <div className="search-bar">
    <input placeholder={placeholder} type="text" name={name} id={name} onChange={onChange} required disabled={disabled} value={value} />
    <button onClick={clicked} className="search-btn"><i className="fas fa-search" /></button>
  </div>
);

SearchBar.defaultProps = {
  placeholder: "",
  onChange: null,
  disabled: false,
  value: undefined,
  clicked: () => { },
};

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clicked: PropTypes.func,
};

export default SearchBar;
