import React, {FormEventHandler, useEffect, useRef} from "react";
import {setName} from "../types";

// props types
interface FormProps {

    handleSubmit: FormEventHandler;
    name: string,
    setName: setName,
    isEditing:boolean

}

const Form: React.FC<FormProps> = ({handleSubmit, name, setName, isEditing}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current!.focus();
    });
    return (
        <form className='new-task-form' onSubmit={handleSubmit}>


            <div className='form-control'>
                <input
                    type='text'
                    className='new-task'
                    placeholder='new todo'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ref={inputRef}
                />
                <button type='submit' className='submit-btn'>
                    {isEditing ? 'edit' : 'add'}
                </button>
            </div>
        </form>
    )

}


export default Form;
