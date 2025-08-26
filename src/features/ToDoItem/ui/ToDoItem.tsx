import React, {memo} from "react";
import { useDispatch } from "react-redux";
import {removeToDo, toggleCompletedToDo, type ToDo, reorderToDo} from "@entities/todo/model/toDoSlice";
import styles from './ToDoItem.module.css';

type toDoProps = {
	todo: ToDo;
  draggableToDo: ToDo | null;
  setDraggableToDo: (todo: ToDo | null) => void;
}

const ToDoItem: React.FC<toDoProps> = ({ todo, draggableToDo, setDraggableToDo }) => {
	const dispatch = useDispatch();
	const handleRemoveToDo = () => {
		dispatch(removeToDo(todo.id));
	};
	const handleClickCompleted = () => {
		dispatch(toggleCompletedToDo(todo.id))
	};

  const handleDragStart = (dragToDo: ToDo) => {
    setDraggableToDo(dragToDo);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.background = 'transparent';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.background = 'transparent';
  };
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.currentTarget.style.background = 'red';
  };
  const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropToDo: ToDo) => {
    e.preventDefault();
    if (draggableToDo && draggableToDo.id !== dropToDo.id) {
      dispatch(reorderToDo({fromId: draggableToDo.id, toId: dropToDo.id}))
    }
    e.currentTarget.style.background = 'transparent';
  };

	return (
    <li
      className={styles.container}
      draggable={true}
      onDragStart={() => handleDragStart(todo)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, todo)}
    >
      <input type="checkbox" checked={todo.completed} onChange={handleClickCompleted} className={styles.checkbox}/>
      <p className={`${styles.text} ${todo.completed ? styles['text-completed'] : ''}`}>{todo.text}</p>
      <button className={styles.button_remove_item} onClick={handleRemoveToDo} aria-label="удалить задачу" title='Удалить'>
        <div className={styles.sign}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </button>
    </li>
  )
}

export default memo(ToDoItem);