import React, { useState, useContext } from 'react'
import { Button } from "../../../../components/Button";
import { TextArea } from "../../../../components/Inputs";

import { FormContext } from "../../../../context/FormContext";

import "./EditComment.scss";

const EditCommentContainer = ({post,postId, editComment}) => {
    const [comment, setComment] = useState(post);
    const [, setChangedForm] = useContext(FormContext);

    const onChangeHandler = event =>{
        setComment(event.target.value);
    }

    const comfirmChanges = () =>{
        if(comment.length > 0){
            editComment(postId, comment);
            setChangedForm({ renderForm:"", show: false });
        }
    }

    return (
        <>
        <div className="comment-edit-area">
            <TextArea
                onChange={onChangeHandler}
                name="text"
                value={comment}
                />
        </div>
        <Button clicked={comfirmChanges} classes="form-btn btn-blueGradient btn-md">update</Button>
        </>
    )
}

export default EditCommentContainer;
