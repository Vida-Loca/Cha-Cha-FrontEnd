/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import { Button, EditButton } from "../Button";
import { TextInputNL, TextArea } from "../Inputs";
import { UserContext } from "../../context/UserContext";


import "./Commentcard.scss";

const Commentcard = ({eventId, text, user,likes, timePosted,isLiked, likeComment}) => {

  const [loggedInUser,] = useContext(UserContext);

  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [containerState, containerStateSet] = useState(false);



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
    containerStateSet(!containerState);
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
    containerStateSet(false);
  };

  const cancelEdit = () => {
    setEditState(false);
    containerStateSet(false);
   
  };
  
  


  return (
    <>
      <div className="comment-card-container">
        <Avatar imageLink={user.picUrl} />
        <div className="comment-info">
          <div className="comment-header">
            <span className="username">{user.username}: </span>
            <div className="like-btn">
              <Button clicked={likeComment}>
                <i className={`fas fa-heart ${isLiked? "liked": ""}`}/>
              </Button>
              {likes}
            </div>
          </div>
          <div className="comment-body tooltip">
            {containerState && (
              <span className="tooltiptext">
                {!editState &&
                  <EditButton
                    options={deleteState}
                    activate={deleteHandler}
                    cancel={cancelDelete}
                    render={<i className="far fa-trash-alt" />}
                    confirm={() => {}}
                  />}

                {!deleteState &&
                  <EditButton
                    options={editState}
                    activate={editHandler}
                    cancel={cancelEdit}
                    render={<i className="far fa-edit" />}
                    confirm={() => {}}
                  />}

              </span>
            )}
            <span className="comment-content">
              <TextArea value={text} name="comment" disabled={!editState} />
            </span>
            {(loggedInUser.user.id === user.id || user.isEventAdmin)
              && <Button classes="options-btn" clicked={changeOptions}>
                {containerState ? <i className="fas fa-times" /> : <i className="fas fa-ellipsis-v" />}
              </Button>}
            </div>
          </div>
      </div>
    </>
  );
};

Commentcard.propTypes = {
  eventId: PropTypes.string.isRequired,
  removeProduct: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    isEventAdmin: PropTypes.bool.isRequired
  }).isRequired,

};

export default Commentcard;
