import React, {useEffect, useState} from 'react';
import Token from "../services/Token";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendTyping, socketInit, socketUserDisconnect} from "../store/actions/socket";
import {getMessagesRequest, sendMessageRequest} from "../store/actions/messages";
import _ from 'lodash'
import {getMyAccount, logOutChat} from "../store/actions/users";
import Typing from "../components/Typing";

function Chat() {
  const [message, setMessage] = useState('');
  const messagesList = useSelector(store => store.messages.messagesList);
  const token = useSelector(store => store.users.token);
  const typing = useSelector(store => store.users.typing);
  const myAccount = useSelector(store => store.users.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(getMessagesRequest());
      dispatch(socketInit(Token.getToken()));
    }
  }, [token]);
  const typeMessage = (ev) => {
    ev.preventDefault();
    dispatch(sendTyping(myAccount))
    setMessage(ev.target.value);
  }
  const handleSendMessage = (ev) => {
    ev.preventDefault();
    if (message) {
      dispatch(sendMessageRequest(message));
      setMessage('');
    }
  }
  const handleLogOut = () => {
    dispatch(logOutChat());
    dispatch(socketUserDisconnect);
    navigate('/welcome')
  }
  return (
    <div className='chatWrapper'>
      <button className='logOutBtn' onClick={handleLogOut}>other</button>
      <div className="chatBlock">
        <div className="chatWithName">
          chat with Anonymous
        </div>
        <div className="messagesBlock">
          <ul className='messages'>
            {messagesList.map(l => {
              return (
                <React.Fragment key={_.uniqueId()}>
                  <li className={`messageList ${l.senderId === myAccount.id ? 'myMessage' : 'otherMessage'}`}>
                    <p className='senderName'>{l.senderName}</p>
                    <p className='message'>{l.message}</p>
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        </div>
        {typing ? <Typing status={typing}/> : null}
        <div className="messageFormBlock">
          <form className='messageForm'>
            <input
              maxLength="200"
              className='messageFormInput'
              type="text"
              placeholder='Message'
              value={message}
              onChange={typeMessage}
            />
            <button className='sendMassageBtn' onClick={handleSendMessage}>send</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Chat;