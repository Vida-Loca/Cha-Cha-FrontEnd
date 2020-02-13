import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const EditButton = ({ activate, cancel, options }) => {
  return (
    <div className="settings">
      {options ? (
        <>
          <Button
            clicked={cancel}
            classes="btn-sm btn-default-orange cancel-btn"
          >
            <span>
              <i className="fas fa-times-circle" />
              cancel
            </span>
          </Button>
          <Button classes="btn-sm btn-default-blue confirm-btn">
            <span>
              <i className="fas fa-check" />
              confirm
            </span>
          </Button>
        </>
      ) : (
        <>
          <Button clicked={activate} classes="btn-sm btn-default edit-btn">
            <span>
              <i className="far fa-edit" />
              edit
            </span>
          </Button>
        </>
      )}
    </div>
  );
};

EditButton.defaultProps = {
  options: false
};

EditButton.propTypes = {
  options: PropTypes.bool,
  activate: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default EditButton;
