import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {logIn} from "../store/actions/users";
import Token from "../services/Token";
import {useNavigate} from "react-router-dom";

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogin = (ev) => {
    ev.preventDefault();
    dispatch(logIn({login, password}, (err, data) => {
      if (err) {
        console.log(err)
      } else if (data.status === 'ok') {
        Token.setToken(data.token);
        navigate('/welcome');
      }
    }))
  }
  return (
    <div>
      <form className='loginForm'>
        <input type="text" value={login} onChange={(ev) => setLogin(ev.target.value)}/>
        <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
        <button onClick={handleLogin}>log in</button>
      </form>
    </div>
  );
}

export default Login;