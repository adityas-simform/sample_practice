import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState: any = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log('action', action);

      state.todoList.push({id: nanoid(), text: action.payload});
    },
    removeTodo: (state, action) => {
      console.log('action', action);
      state.todoList = state.todoList.filter(
        (item: any) => item.id !== action.payload,
      );
    },
  },
});

export const {addTodo, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;
