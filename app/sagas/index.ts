import { all, fork } from 'redux-saga/effects';
import { getTodos } from './todoSaga';

/**
 * The root saga for the application.
 * @returns None
 */
export default function* rootSaga() {
  yield all([fork(getTodos)]);
}
