import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {logIn} from "../store/actions/users";

function Login(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (ev) => {
    ev.preventDefault();
    dispatch(logIn({login, password}))
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