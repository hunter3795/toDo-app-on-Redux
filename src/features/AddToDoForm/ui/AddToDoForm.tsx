import React, {useState, type ChangeEvent, useId} from "react";
import { useDispatch } from "react-redux";
import styles from './AddToDoForm.module.css';
import {addToDo} from "@entities/todo/model/toDoSlice";

const AddToDoForm: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const inputId = useId();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const dispatch = useDispatch();
	
	const handleClickAddToDo = () => {
		if (value.trim()) {
			dispatch(addToDo({ text: value }));
      setValue('');
		}
	};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      dispatch(addToDo({ text: value }));
      setValue('');
    }
  };
    return (
      <label className={styles.label} htmlFor={inputId}>
        <input id={inputId} type='text' value={value} onChange={handleChange} className={styles.input} onKeyDown={handleKeyDown} placeholder='Задача...' />
        <button onClick={handleClickAddToDo} className={styles.button_add}>
          <span className={styles.text_button_add}>Добавить</span>
        </button>
      </label>
    )
};

export default AddToDoForm;