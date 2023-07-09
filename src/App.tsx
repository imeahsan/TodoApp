import React, {useEffect, useState} from 'react';
import './App.css';
import {CheckItem, EditItem, IItem, RemoveItem, ShowAlert} from "./types";
import Alert from './components/Alert';
import List from "./components/List";
import Form from "./components/Form";



// to get tasks  list from local storage
const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (typeof list === 'string') {
        return (list = JSON.parse(list));
    } else {
        return [];
    }
};


function App() {
    // states
    const [name, setName] = useState('');
    const [list, setList] = useState<IItem[]>(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState<number | null>(null);
    const [alert, setAlert] = useState({show: false, msg: '', typ: ''});


// to update data in local storage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);


    // handler for add and update task
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || /^\s*$/.test(name)) {
            showAlert(true, 'danger', 'Please enter value');
        } else if (name && isEditing) {
            setList(
                list.map((item) =>
                    item.id === editID ? {...item, title: name} : item
                )
            );
            setName('');
            setEditID(null);
            setIsEditing(false);
            showAlert(true, 'success', 'Task updates');
        } else {
            showAlert(true, 'success', 'Task added to the list');
            const newItem = {id: Date.now(), title: name, completed: false};
            setList([...list, newItem]);
            setName('');
        }
    };

    // to show alerts
    const showAlert: ShowAlert = (show = false, typ = '', msg = '') => {
        setAlert({show, typ, msg});
    };

    // to clear task list
    const clearList = () => {
        showAlert(true, 'danger', 'Empty list');
        setList([]);
    };


    // to remove task from list
    const removeItem: RemoveItem = (id) => {
        showAlert(true, 'danger', 'Item removed');
        setList(list.filter((item) => item.id !== id));
    };

    // edit task handler set tasks for editing
    const editItem: EditItem = (item) => {
        const editedItem = list.find((el) => el.id === item.id);
        setIsEditing(true);
        setEditID(item.id);
        if (editedItem) {
            setName(editedItem.title);
        }
    };

    // to mark task as completed
    const checkItem: CheckItem = (item, status) => {
        console.log(status)
        setList(
            list.map((i) =>
                i.id === item.id ? {...item, completed: status} : i
            )
        );

        console.log(list)
    };

// jsx syntax
    return (
        <section className='section-center'>

            <h3>Todo list</h3>

            {/*Form component for add editing tasks*/}

            <Form handleSubmit={handleSubmit} name={name} setName={setName} isEditing={isEditing}/>

            {/* alert */}
            {alert.show && (
                <Alert alert={alert} removeAlert={showAlert} list={list}/>
            )}

            {/*task list*/}
            {list.length > 0 && (
                <div className='task-container'>
                    <List items={list} removeItem={removeItem} editItem={editItem} checkItem={checkItem}/>
                    <button className='clear-btn' onClick={clearList}>

                        Clear Items
                    </button>
                </div>
            )}
        </section>
    );
}

export default App;
