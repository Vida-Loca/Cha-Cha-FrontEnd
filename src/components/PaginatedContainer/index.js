import React, { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../Pagination";

import "./PaginatedContainer.scss";

const PaginatedContainer = ({ render, items, perPage, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="paginated-content-column">
      {title === "" ? null : <h2 className="pagination-title">{title}</h2>}

      {render({ items: currentPosts })}
      <Pagination currentPage={currentPage} postsPerPage={perPage} totalPosts={items.length} paginate={paginate} />
    </div>
  );
};

PaginatedContainer.defaultProps = {
  perPage: 5,
  title: ""
};

PaginatedContainer.propTypes = {
  render: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  perPage: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default PaginatedContainer;
