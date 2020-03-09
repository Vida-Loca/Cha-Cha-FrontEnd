import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const EditButton = ({ activate, cancel, options, tags, render }) => {
  return (
    <div className="settings">
      {options ? (
        <>
          <Button clicked={cancel} classes="btn-sm btn-default-orange cancel-btn">
            <span>
              <i className="fas fa-times-circle" />
              {tags ? "cancel" : ""}
            </span>
          </Button>
          <Button classes="btn-sm btn-default-blue confirm-btn">
            <span>
              <i className="fas fa-check" />
              {tags ? "confirm" : ""}
            </span>
          </Button>
        </>
      ) : (
        <>
          <Button clicked={activate} classes="btn-sm btn-default edit-btn options-main">
            {render}
          </Button>
        </>
      )}
    </div>
  );
};

EditButton.defaultProps = {
  options: false,
  tags: false
};

EditButton.propTypes = {
  tags: PropTypes.bool,
  options: PropTypes.bool,
  activate: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default EditButton;
