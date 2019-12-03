import React, {useState, createContext} from 'react';

export const FormContext = createContext();

export const FormProvider = (props) => {

    const [movie, setmovie] = useState(
        {
            name: 'kesk'
        }
    );

    return(
        <FormContext.Provider value={[movie, setmovie]}>
            {props.children}
        </FormContext.Provider>
    );
}