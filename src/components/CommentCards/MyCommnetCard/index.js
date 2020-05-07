import React, {useContext, useState} from 'react'
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button, EditButton } from "../../Button";


import "./MyCommentCard.scss";

const MyCommentCard = ({eventId, text, likes, edited, timeStamp, openEditModal, deleteComment}) => {

    const [editState, setEditState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [containerState, setContainerState] = useState(false);
  
    const [tileState, tileStateSet] = useState(false);
  
  
  
    // const onChangeHandlerPrice = event => {
    //   if (event.target.value.length < 20) {
    //     setTileSuply({
    //       ...tileSupply,
    //       [`${event.target.name}`]: event.target.value
    //     });
    //   };
    // }
    // const onChangeHandlerDescription = event => {
    //   if (event.target.value.length < 250) {
    //     setTileSuply({
    //       ...tileSupply,
    //       [`${event.target.name}`]: event.target.value
    //     });
    //   };
    // }
  
    const changeOptions = () => {
      setContainerState(!containerState);
      setDeleteState(false);
      setEditState(false);
     
    };
  
    const deleteHandler = () => {
      setDeleteState(!deleteState);
      
    };
    const editHandler = () => {
      setEditState(!editState);
    };
  
    const cancelDelete = () => {
      setDeleteState(false);
      tileStateSet(false);
    };
  
    const cancelEdit = () => {
      setEditState(false);
      tileStateSet(false);
     
    };
  

    return (
        <div className={`comment-card-container tooltip ${containerState ? "options": ""}`}>
            {containerState && (
            <span className="tooltiptext">
                {!editState &&
                <EditButton
                    options={deleteState}
                    activate={deleteHandler}
                    cancel={cancelDelete}
                    render={<i className="far fa-trash-alt" />}
                    confirm={deleteComment}
                />}
    
                {!deleteState &&
                <EditButton
                    options={editState}
                    activate={openEditModal}
                    cancel={cancelEdit}
                    render={<i className="far fa-edit" />}
                    confirm={() => {}}
                />}
  
          </span>
        )}
            <div className="comment-header">
                  {
                    likes > 0
                    ? <> 
                      {likes}
                      <i className={`fas fa-heart`}/>
                    </>
                    : ""
                  }
                
            </div>
            <div className="comment-body">
                <div className="my-comment-content">
                    {text}
                    <div className="time-stamp">{timeStamp}
                    {edited ? 
                    <span className="edited">
                      <i className="fas fa-pencil-alt"/>{"edited"}
                    </span>
                    : ""}
              </div>
                </div>
                <Button classes="options-btn" clicked={changeOptions}>
                    {containerState ? <i className="fas fa-times" /> : <i className="fas fa-ellipsis-v" />}
                </Button>
            </div>
            
    </div>
    )
}


export default MyCommentCard;