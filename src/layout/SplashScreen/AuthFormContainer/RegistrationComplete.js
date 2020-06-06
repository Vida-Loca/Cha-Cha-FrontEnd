import React from "react";
import PropTypes from "prop-types";
import "./authStyle.scss";

const RegistrationComplete = ({ email }) => (
  <div className="registration-confirmation-container">
    <i className="fas fa-check-circle" />
    <h2>Registration complete</h2>
    <p>
      check your email
      <span className="email">{` "${email}" `}</span>
      for confirmation
    </p>
  </div>
);

RegistrationComplete.propTypes = {
  email: PropTypes.string.isRequired,
};

export default RegistrationComplete;
