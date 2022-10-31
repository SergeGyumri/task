import { all, fork } from 'redux-saga/effects'
import users from './users';
import messages from './messages';
import form from './form';

export default function* watchers() {

  yield all([
    users,
    form,
    messages
  ].map(fork))

}
