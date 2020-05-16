/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button } from "../../Button";
import moment from "moment";


import "./Commentcard.scss";

const Commentcard = ({ text, user, likes, isLiked, edited, timeStamp, likeComment}) => {


  return (
  <div className="my-comment-card-container">
      <div className="comment-header">
          <span className="username">{user.username}</span>
          <Button clicked={likeComment}>
              <i className={`fas fa-heart ${isLiked? "liked": ""}`}/>
          </Button>
          {likes > 0 ? likes : ""}
      </div>
      <div className="comment-body">
        <Avatar imageLink={user.picUrl} />
        <div className="comment-content">
          {text}
          <div className="time-stamp">{moment(timeStamp).fromNow()} {edited 
          ? <span className="edited">
              <i className="fas fa-pencil-alt"/>{"edited"}
            </span>
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};


Commentcard.defaultPropTypes = {
  timeStamp: "now",
  likeComment: () => {}
}

Commentcard.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    isEventAdmin: PropTypes.bool.isRequired
  }).isRequired,
  likes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  edited: PropTypes.bool.isRequired,
  timeStamp: PropTypes.string,
  likeComment: PropTypes.func
};

export default Commentcard;
