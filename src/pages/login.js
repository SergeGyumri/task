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
  const goToRegister = (ev) => {
    ev.preventDefault();
    navigate('/register')
  }
  return (
    <div className='wrapper'>
      <form className='form'>
        <div className='pageBlock'>
          <h3 className='pageBlockTitle'>login</h3>
        </div>
        <div className="pageFormBlock">
          <input placeholder='Login' className='g-input chooseName' type="text" value={login}
                 onChange={(ev) => setLogin(ev.target.value)}/>
          <input placeholder='Password' className='g-input chooseName' type="password" value={password}
                 onChange={(ev) => setPassword(ev.target.value)}/>
          <button className='g-btn' onClick={handleLogin}>go</button>
        </div>
        <div className='otherBlock'>
          <p className='desc'>dont have a account ? </p>
          <button className='g-btn' onClick={goToRegister}>register</button>
        </div>
      </form>

    </div>

  );
}

export default Login;