import { Middleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import refreshSlice from "./RefreshSlice";

const sagaMiddleware = createSagaMiddleware<Middleware>();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: combineReducers({
    todo: todoReducer,
    refresh: refreshSlice,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
