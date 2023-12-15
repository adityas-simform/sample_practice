import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";

// Generator function
function* getUpdatedTodo({ payload }: PayloadAction<string>) {
    try {
      console.log('payload : ',payload);
      
    // You can also export the axios call as a function.
    } catch (error) {
    }
}

// Generator function
export function* getTodos() {
    yield takeLatest('todo/removeTodo', getUpdatedTodo);
  }
  