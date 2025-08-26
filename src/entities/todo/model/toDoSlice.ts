import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export type ToDo = {
	id: string;
	text: string;
	completed: boolean;
};

type toDoState = {
	todos: ToDo[];
};

const initialState: toDoState = {
	todos: []
};

const toDoSlice = createSlice({
	name: 'toDos',
	initialState,
	reducers: {
		addToDo: (state, action) => {
			state.todos.push({
				id: uuidv4(),
				text: action.payload.text,
				completed: false,
			})
		},
		removeToDo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((todo) => todo.id != action.payload)
		},
		toggleCompletedToDo: (state, action: PayloadAction<string>) => {
			const toDo = state.todos.find((todo) => (todo.id === action.payload))
			if (toDo) {
				toDo.completed = !toDo.completed
			}
		},
		removeAllToDo: (state) => {
			state.todos = [];
		},
		removeCompletedTodo: (state) => {
			state.todos = state.todos.filter((todo) => !todo.completed)
		},
    reorderToDo: (state, action) => {
      const { fromId, toId } = action.payload;
      const fromIndex = state.todos.findIndex((todo) => todo.id === fromId);
      const toIndex = state.todos.findIndex((todo) => todo.id === toId);

      if (fromIndex === -1 || toIndex === -1) return;
      const [movedItem] = state.todos.splice(fromIndex, 1);
      state.todos.splice(toIndex, 0, movedItem);
    }

	}
});

export const { addToDo, removeToDo, toggleCompletedToDo, removeAllToDo, removeCompletedTodo, reorderToDo } = toDoSlice.actions;
export default toDoSlice.reducer;