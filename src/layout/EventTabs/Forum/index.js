import React, { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from "prop-types";

import { forumService } from "../../../Authentication/service";
import { UserContext } from "../../../context/UserContext";

import { TextArea } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import {CommentCard, MyCommentCard} from "../../../components/CommentCards";

import "./Forum.scss";
import {AllComments} from "../../../mockData";

const Forum = ({eventId, isEventAdmin}) => {

    const [newComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState({comments: [], loading: true});
    const [loggedInUser,] = useContext(UserContext);

    // const orderComments = (commentList, perPage) =>{
    //     let newCommentList = [];
    //     let partOfComments = [];

    //     commentList.reverse().forEach((comment, index) => {
    //     partOfComments.push(comment);
    //     if ((index+1) % perPage === 0 || (index+1) === commentList.length) {
    //         console.log(index);
    //         newCommentList = newCommentList.concat(partOfComments.reverse());
    //         partOfComments = [];
    //     }
    //     });
    //   return newCommentList;
    // }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }
  
    useEffect(scrollToBottom, [allComments]);

    useEffect(() =>{

        let __isMounted = true;

        forumService.getAllCommentsFromAnEvent(eventId)
        .then(res =>{
            console.log(res);
            if(__isMounted){
                setAllComments({comments: AllComments , loading: false});
            }
        }, err =>{
            console.log(err);
            if(__isMounted){
                setAllComments({comments: [], loading: false});
            }
        })
        
        return(() =>{
            __isMounted = false;
        })
    }, [])

    const newCommentOnChangeHandler = event =>{
        setNewComment(event.target.value);
    }

    const submitComment = () =>{
        console.log(`sending: ${newComment} to event ${eventId}`);
        forumService.makeAComment(eventId, {post: newComment})
        .then(res =>{
            console.log(res);
            const newCommentTemp = {
                id: newComment,
                likes: 0,
                text: newComment,
                timePosted: "now",
                updated: false,
                userCard: {
                    id: loggedInUser.user.id,
                    username: loggedInUser.user.username,
                    picUrl: loggedInUser.user.picUrl
                }
            }
            let tempComments = allComments.comments;
            tempComments.push(newCommentTemp);
            setAllComments({...allComments, comments: tempComments});
            setNewComment("");
        }, err =>{
            console.log(err);
        })
    }

    const likeAcomment = (commentId) =>{
        const modifiedComment = allComments.comments.map( comment => {
            if(comment.id === commentId){
                if(comment.isLiked === true){
                    return comment;
                } else{
                    return {...comment, isLiked: true, likes: comment.likes+1}
                }
            }
            return comment;
        })

        setAllComments({...allComments, comments: modifiedComment});
 
    }

    return (
        <div className="forum-container">

            {/* <ChatContainer commentList={allComments.comments} eventId={eventId} /> */}
            <div className="chat-container">
               {
               allComments.comments.map(comment =>{
                   return (
                    <CommentCard
                        likeComment={() => likeAcomment(comment.id)}
                        eventId={eventId}
                        likes={comment.likes}
                        isLiked={comment.isLiked}
                        text={comment.text}
                        timeStamp={`${comment.timePosted.substring(0,10)} ${comment.timePosted.substring(12,16)}`}
                        user={{
                            id: comment.userCard.id,
                            picUrl: comment.userCard.picUrl,
                            username:  comment.userCard.username,
                            isEventAdmin: true
                        }}
                        key={comment.id}
                  
                    />
                   )
               })
           }
            <div ref={messagesEndRef} />
        </div>
             <div className="comment-text-send">
                <div className="my-comment-area">
                    <TextArea name="comment" onChange={newCommentOnChangeHandler} value={newComment} placeholder="write something..." />
                </div>
                <Button clicked={submitComment} classes="btn-blueGradient btn-md">send <i className="fas fa-paper-plane"/></Button>
            </div>
            
    
        </div>
    )
}

Forum.propTypes = {
    eventId: PropTypes.string.isRequired,
    isEventAdmin: PropTypes.bool.isRequired
}

export default Forum;