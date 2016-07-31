import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import mailApp from 'reducers/mail';

const loggerMiddleware = createLogger()
let mailStore = createStore(
  mailApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default mailStore;
