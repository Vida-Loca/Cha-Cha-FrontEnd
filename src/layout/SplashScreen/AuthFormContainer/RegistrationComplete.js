import React from "react";
import "./authStyle.scss";

const RegistrationComplete = ({ email }) => {
    return (
        <div className="registration-confirmation-container">
            <i className="fas fa-check-circle" />
            <h2>Registration complete</h2>
            <p>check your email<span className="email">{` "${email}" `}</span> for confirmation</p>
        </div>
    )
}

export default RegistrationComplete;