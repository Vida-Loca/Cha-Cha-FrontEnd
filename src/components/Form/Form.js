import React from "react";
import PropTypes from "prop-types";
import "./Form.scss";

const Form = ({ action, method, children }) => {
  return (
    <form className="FormContainer" action={action} method={method}>
      {children}
    </form>
  );
};

Form.defaultProps = {
  action: "",
  method: "GET"
};

Form.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Form;
