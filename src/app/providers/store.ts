import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from '../../entities/todo/model/toDoSlice.ts';

const loadSave = () => {
	try {
		const localeStorageState = localStorage.getItem('todos');
		if (localeStorageState === null) return;
		return {
			todos: {
				todos: JSON.parse(localeStorageState)
			}
		}
	}
	catch {
		console.log('Ошибка при загрузке из localStorage')
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const savaState = (state: any) => {
	try {
		const localeStorageState = JSON.stringify(state.todos.todos);
		localStorage.setItem('todos', localeStorageState);
	} catch {
		console.log('Ошибка при загрузке в localStorage');
	}
}

const store = configureStore({
  reducer: {
		todos: toDoReducer
	},
	preloadedState: loadSave()
});

store.subscribe(() => {
	savaState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>;

export default store;