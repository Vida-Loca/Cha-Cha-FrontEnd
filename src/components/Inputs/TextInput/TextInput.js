import React from 'react';
import './TextInput.scss';

const TextInput = ({name,placeholder}) => {
    return(
        <div class="textInput">
            <input type="text" name={name} required/>
            <label>{placeholder} </label>
      </div>
    );
}

export default TextInput;