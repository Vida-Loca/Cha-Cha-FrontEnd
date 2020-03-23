import React from "react";
import PropTypes from "prop-types";
import "./searchbar.scss";

const SearchBar = ({ name, placeholder, onChange, disabled, value, clicked }) => {
    return (
        <div className="search-bar">
            <input placeholder={placeholder} type="text" name={name} id={name} onChange={onChange} required disabled={disabled} value={value} />
            <button onClick={clicked} className="search-btn"><i className="fas fa-search" /></button>
        </div>
    );
};

SearchBar.defaultProps = {
    placeholder: "",
    onChange: null,
    disabled: false,
    value: undefined,
    clicked: () => { }
};

SearchBar.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    clicked: PropTypes.func
};

export default SearchBar;