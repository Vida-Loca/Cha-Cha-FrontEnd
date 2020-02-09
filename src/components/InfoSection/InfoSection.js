import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "../Button";

const InfoSection = ({ label, content, clickedEditForm }) => {
  return (
    <div className="infoSection">
      <div>
        <IconButton clicked={clickedEditForm} iconClass="fas fa-edit" />
        <strong>{`${label}:`}</strong>
      </div>
      <div>{content}</div>
    </div>
  );
};

InfoSection.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string,
  clickedEditForm: PropTypes.func.isRequired
};

export default InfoSection;
