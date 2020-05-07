import React, { useState, useContext } from 'react'
import { Button } from "../../../../components/Button";
import { TextArea } from "../../../../components/Inputs";
import Spinner from "../../../../components/Spinner";

import { FormContext } from "../../../../context/FormContext";
import { forumService } from "../../../../Authentication/service";

import "./EditComment.scss";

const EditCommentContainer = ({post,postId, editComment}) => {
    const [comment, setComment] = useState(post);
    const [updateSent, setUpdateSent] = useState(false);
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
           
            {updateSent
                ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
                : <Button clicked={comfirmChanges} classes="form-btn btn-blueGradient btn-md">update</Button>
            } 
        </>
    )
}

export default EditCommentContainer;
