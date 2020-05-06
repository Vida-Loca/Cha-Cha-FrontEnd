import React from 'react'
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button } from "../../Button";


import "./MyCommentCard.scss";

const MyCommentCard = ({eventId, text, user, likes,isLiked, timeStamp, likeComment}) => {
    return (
        <div className="my-comment-card-container">
            <div className="comment-header">
                <span className="username">{user.username}</span>
                <Button clicked={likeComment}>
                    <i className={`fas fa-heart ${isLiked? "liked": ""}`}/>
                </Button>
                {likes}
            </div>
             <Avatar imageLink={user.picUrl} />
             <div className="comment-content">
                {text}
                 <div className="time-stamp">{timeStamp}</div>
             </div>
        </div>
    )
}


export default MyCommentCard;