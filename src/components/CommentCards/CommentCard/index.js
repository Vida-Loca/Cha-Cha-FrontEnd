/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button } from "../../Button";


import "./Commentcard.scss";

const Commentcard = ({eventId, text, user,likes, edited, timeStamp,isLiked, likeComment}) => {


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
          <div className="time-stamp">{timeStamp} {edited 
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

// Commentcard.propTypes = {
//   eventId: PropTypes.string.isRequired,
//   removeProduct: PropTypes.func.isRequired,
//   product: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired
//   }).isRequired,
//   user: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     picUrl: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//     isEventAdmin: PropTypes.bool.isRequired
//   }).isRequired,

// };

export default Commentcard;
