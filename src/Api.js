import axios from "axios";
import Token from './services/Token'

const {REACT_APP_API_URL} = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Token.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, e => Promise.reject(e));


class Api {

  static logIn(data = {}) {
    return api.post('/admin/login', data);
  }

  static getFormData() {
    return api.get('/form/get-form');
  }

  static addField(data = {}) {
    return api.post('/form/add-field', data);
  }

  static deleteField(data = {}) {
    return api.delete('/form/delete-field', data);
  }

  static goToChat = (data = {}) => {
    return api.post('/users/go-to-chat', data);
  }

  static logOutChat() {
    return api.delete('/users/log-out-chat');
  }

  static getMessages() {
    return api.get('/messages/get-messages');
  }

  static sendMessage(message) {
    return api.post('/messages/send-message', {message});
  }

  static deleteMessage(id) {
    return api.delete('/messages/delete-message', id);
  }

  static getMyAccount() {
    return api.get('/users/my-account');
  }

}

export default Api