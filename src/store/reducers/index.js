import {combineReducers} from "redux";
import users from './users';
import messages from './messages';
import form from './form';

export default combineReducers({
  users,
  messages,
  form
})
