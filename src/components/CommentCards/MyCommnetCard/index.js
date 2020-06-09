import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Button, EditButton } from "../../Button";


import "./MyCommentCard.scss";

const MyCommentCard = ({
  text, likes, edited, timeStamp, openEditModal, deleteComment,
}) => {
  const [deleteState, setDeleteState] = useState(false);
  const [containerState, setContainerState] = useState(false);

  const changeOptions = () => {
    setContainerState(!containerState);
    setDeleteState(false);
  };

  const deleteHandler = () => {
    setDeleteState(!deleteState);
  };

  const cancelDelete = () => {
    setDeleteState(false);
  };

  return (
    <div className={`comment-card-container tooltip ${containerState ? "options" : ""}`}>
      {containerState && (
        <span className="tooltiptext">
          <EditButton
            options={deleteState}
            activate={deleteHandler}
            cancel={cancelDelete}
            render={<i className="far fa-trash-alt" />}
            confirm={deleteComment}
          />

          {!deleteState
            && (
            <EditButton
              options={false}
              activate={openEditModal}
              cancel={() => { }}
              render={<i className="far fa-edit" />}
              confirm={() => { }}
            />
            )}

        </span>
      )}
      <div className="comment-header">
        {
          likes > 0
            ? (
              <>
                {likes}
                <i className="fas fa-heart" />
              </>
            )
            : ""
        }

      </div>
      <div className="comment-body">
        <div className="my-comment-content">
          {text}
          <div className="time-stamp">
            {moment(timeStamp).fromNow()}
            {edited
              ? (
                <span className="edited">
                  <i className="fas fa-pencil-alt" />
                  edited
                </span>
              )
              : ""}
          </div>
        </div>
        <Button classes="options-btn" clicked={changeOptions}>
          {containerState ? <i className="fas fa-times" /> : <i className="fas fa-ellipsis-v" />}
        </Button>
      </div>

    </div>
  );
};

MyCommentCard.defaultPropTypes = {
  timeStamp: "now",
};


MyCommentCard.propTypes = {
  text: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  edited: PropTypes.bool.isRequired,
  timeStamp: PropTypes.string.isRequired,
  openEditModal: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default MyCommentCard;
