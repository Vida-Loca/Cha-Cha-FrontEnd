import React from "react";
import PropTypes from "prop-types";
import "./Form.scss";

const Form = ({ action, method, children, err }) => {
  return (
    <form className="FormContainer" action={action} method={method}>
      <div className="errorLabel">
        {err !== "" ? (
          <span>
            <i className="fas fa-exclamation-triangle" /> {err}
          </span>
        ) : null}
      </div>
      {children}
    </form>
  );
};

Form.defaultProps = {
  action: "",
  method: "GET",
  err: ""
};

Form.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  err: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Form;
