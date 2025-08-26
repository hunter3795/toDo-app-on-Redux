import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@app/providers/store";
import { removeAllToDo, removeCompletedTodo, type ToDo } from "@entities/todo/model/toDoSlice";
import styles from "./ToDoList.module.css";
import { useCallback, useMemo, useState } from "react";
import { ToDoItem } from "@features/index";
import { Modal } from "@shared/index";

const ToDoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [draggableToDo, setDraggableToDo] = useState<ToDo | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const handleRemoveAllToDo = () => {
    dispatch(removeAllToDo());
    setOpenModal(false);
  };

  const handleRemoveCompletedToDo = useCallback(() => {
    dispatch(removeCompletedTodo())
  }, [dispatch]);

  const handleClickOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const todosLength = useMemo(() => todos.length, [todos]);
  const todosCompletedLength = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  return (
    <div className={styles.container}>

      {!!todosLength && (
        <>
          <div className={styles.container_texts}>
            <p>🎯 Выполнено: {todosCompletedLength}</p>
            <p>📋 Всего: {todosLength}</p>
          </div>
          <div>
            <ul className={styles.list}>
              {todos.map((todo) => (
                <ToDoItem
                  key={todo.id}
                  todo={todo}
                  draggableToDo={draggableToDo}
                  setDraggableToDo={setDraggableToDo}
                />
              ))}
            </ul>
          </div>
          <div className={styles.container_buttons}>
            <button onClick={handleRemoveCompletedToDo} className={styles.button_remove}>Удалить выполненные</button>
            <button onClick={handleClickOpenModal} className={styles.button_remove}>Удалить все</button>
          </div>
        </>

      )}
      {!todosLength && <p className={styles.text_no_tasks}>Список пуст, добавь новые задачи</p>}
      <Modal active={openModal} setActive={setOpenModal}>
        <div className={styles.container_modal}>
          <p>Вы уверены что хотите удалить все задачи?</p>
          <div className={styles.container_modal_buttons}>
            <button onClick={handleRemoveAllToDo} className={styles.button_remove}>Да</button>
            <button onClick={() => setOpenModal(false)} className={styles.button_remove}>Нет</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default ToDoList;