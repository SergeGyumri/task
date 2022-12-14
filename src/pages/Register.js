import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../store/actions/users";
import {useNavigate} from "react-router-dom";
import Errors from "../components/Errors";

function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (ev) => {
    ev.preventDefault();
    dispatch(registerUser({login, password}, (err, data) => {
      if (err) {
        setErrors(err.errors)
      } else if (data.status === 'ok') {
        navigate('/login');
      }
    }))
  }
  const goToLogin = (ev) => {
    ev.preventDefault();
    navigate('/login');
  }
  return (
    <div className='wrapper'>
      <div className="err-block">
        <Errors errors={errors}/>
      </div>
      <form className='form'>
        <div className='pageBlock'>
          <h3 className='pageBlockTitle'>Register</h3>
        </div>
        <div className="pageFormBlock">
          <input placeholder='Login' className='g-input' type="text" value={login}
                 onChange={(ev) => setLogin(ev.target.value)}/>
          <input placeholder='Password' className='g-input' type="password" value={password}
                 onChange={(ev) => setPassword(ev.target.value)}/>
          <button className='g-btn' onClick={handleLogin}>go</button>
        </div>
        <div className='otherBlock'>
          <p className='desc'>have a account ? </p>
          <button className='g-btn' onClick={goToLogin}>log in</button>
        </div>
      </form>
    </div>
  );
}

export default Register;