import React from 'react';
import {IItem, RemoveItem, EditItem, CheckItem} from '../types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ListProps {
  items: IItem[];
  removeItem: RemoveItem;
  editItem: EditItem;
  checkItem: CheckItem;
}

const List: React.FC<ListProps> = ({ items, removeItem, editItem,checkItem }) => {
  return (
    <div className='task-list'>
      {items.map((item) => {
        return (
          <article className='task-item' key={item.id}>
            <input type="checkbox" checked={item.completed} onChange={()=>{
              checkItem(item,!item.completed)
            }}/>
            <p className='title'>{item.title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(item)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
