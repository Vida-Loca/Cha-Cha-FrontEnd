import React, { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../Pagination";

import "./PaginatedContainer.scss";

const PaginatedContainer = ({ render, items, perPage, title, noContentMsg }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = items === Array.isArray(items) ? items.slice(indexOfFirstPost, indexOfLastPost): [];

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="paginated-content-column">
      {title !== "" && <h2 className="pagination-title">{title}</h2>}

      {items.length === 0
        ? <p>{noContentMsg}</p>
        : render({ items: currentPosts })}
      <Pagination currentPage={currentPage} postsPerPage={perPage} totalPosts={items.length} paginate={paginate} />
    </div>
  );
};

PaginatedContainer.defaultProps = {
  perPage: 5,
  title: "",
  noContentMsg: "empty"
};

PaginatedContainer.propTypes = {
  render: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  perPage: PropTypes.number,
  noContentMsg: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default PaginatedContainer;
