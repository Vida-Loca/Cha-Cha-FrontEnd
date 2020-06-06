import React from "react";
import PropTypes from "prop-types";
import "./Pagination.scss";

const Pagination = ({
  postsPerPage, totalPosts, paginate, currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.length > 1
        ? pageNumbers.map((number) => (
          <button className={currentPage === number ? "active" : ""} key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))
        : null}
    </div>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
