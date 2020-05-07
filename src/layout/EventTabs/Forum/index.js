import React, { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from "prop-types";

import { forumService } from "../../../Authentication/service";
import { UserContext } from "../../../context/UserContext";
import { FormContext } from "../../../context/FormContext";

import { TextArea } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import {CommentCard, MyCommentCard} from "../../../components/CommentCards";
import EditCommentContainer from "./EditCommentContainer";

import "./Forum.scss";
// import {AllComments} from "../../../mockData";

const Forum = ({eventId, isEventAdmin}) => {

    const [newComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState({comments: [], loading: true});
    const [loggedInUser,] = useContext(UserContext);
    const [,setForm] = useContext(FormContext);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
            messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  
    useEffect(scrollToBottom, [allComments]);

    useEffect(() =>{

        let __isMounted = true;
        forumService.getAllCommentsFromAnEvent(eventId)
        .then(res =>{
            console.log(res);
            if(__isMounted){
                const tempComments = res.reverse().map( comment => {
                    return {...comment, isLiked: comment.likers.length > 0 && comment.likers.indexOf( liker => liker.user.id === loggedInUser.user.id)}
                })
                setAllComments({comments: tempComments , loading: false});
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
                id: res.id,
                likes: 0,
                text: newComment,
                timePosted: "now",
                updated: false,
                eventUser: {
                    user: {
                        id: loggedInUser.user.id,
                        username: loggedInUser.user.username,
                        picUrl: loggedInUser.user.picUrl
                    }
                   
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
        const commentIndex = allComments.comments.findIndex(comment => comment.id === commentId);
        if(commentIndex > -1 && allComments.comments[commentIndex].isLiked !== true){
            forumService.likeAComent(commentId)
            .then(res =>{
                console.log(res);
                const modifiedComment = allComments.comments.map( comment => {
                    if(comment.id === commentId){
                        return {...comment, 
                            isLiked: true, 
                            likes: comment.likes+1
                        }
                    }
                    return comment;
                })
                setAllComments({...allComments, comments: modifiedComment});
            }, err =>{
                console.log(err);
            })
        }
        
       
 
    }
    const deleteComment = (postId) =>{
        forumService.deleteComment(postId)
        .then(_res =>{
            let tempComments = allComments.comments;
            tempComments = tempComments.filter(comment => comment.id !== postId);
            setAllComments({...allComments, comments: tempComments});
        }, err =>{
            console.log(err);
        })
    }

    const editComment = (commentId, text) =>{

        forumService.editComment(commentId, {
            post: text
        })
        .then(_res =>{
            let tempComments = allComments.comments;
            tempComments = tempComments.map(comment => {
                if(comment.id === commentId){
                    return {...comment, updated: true, text: text}
                }
                return {...comment};
            });
            setAllComments({...allComments, comments: tempComments});
        }, err =>{
            console.log(err);
        })
       
    }

    const editCommentOpenModal = (post, postId) =>{
        setForm({ renderForm: <EditCommentContainer postId={postId} editComment={editComment} post={post} />, show: true });
    }

    return (
        <div className="forum-container">

            <div className="chat-container">
               {
               allComments.comments.map(comment =>{
                return comment.eventUser.user.id === loggedInUser.user.id
                ? (
                    <MyCommentCard 
                        key={comment.id}
                        eventId={eventId}
                        text={comment.text}
                        edited={comment.updated}
                        likes={comment.likes}
                        timeStamp={`${comment.timePosted.substring(0,10)} ${comment.timePosted.substring(12,16)}`}
                        openEditModal={() => editCommentOpenModal(comment.text, comment.id)}
                        deleteComment={() => deleteComment(comment.id)}
                    />
                )
                : (
                    <CommentCard
                        likeComment={() => likeAcomment(comment.id)}
                        eventId={eventId}
                        likes={comment.likes}
                        isLiked={comment.isLiked}
                        text={comment.text}
                        edited={comment.updated}
                        timeStamp={`${comment.timePosted.substring(0,10)} ${comment.timePosted.substring(12,16)}`}
                        user={{
                            id: comment.eventUser.user.id,
                            picUrl: comment.eventUser.user.picUrl,
                            username:  comment.eventUser.user.username,
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