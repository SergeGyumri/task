import React, {useEffect, useState} from 'react';
import Token from "../services/Token";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendTyping, socketInit, socketUserDisconnect} from "../store/actions/socket";
import {deleteMessageRequest, getMessagesRequest, sendMessageRequest} from "../store/actions/messages";
import _ from 'lodash'
import {blockUser, getMyAccount, logOutChat} from "../store/actions/users";
import Typing from "../components/Typing";
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Chat() {
  const [message, setMessage] = useState('');
  const messagesList = useSelector(store => store.messages.messagesList);
  const token = useSelector(store => store.users.token);
  const [menuIsOpen, setMenuIsOpen] = useState(null);
  const typing = useSelector(store => store.users.typing);
  const myAccount = useSelector(store => store.users.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(getMyAccount());
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
  const handleMenuOpen = (id) => {
    setMenuIsOpen(id);
  }
  const handleOverlay = () => {
    setMenuIsOpen(null);
  }
  const handleBlockUser = (userId) => {
    dispatch(blockUser(userId));
  }
  const handleDeleteMessage = (messageId) => {
    dispatch(deleteMessageRequest(messageId));
    setMenuIsOpen(null);
  }
  return (
    <div className='chatWrapper'>
      {menuIsOpen ? <div onClick={handleOverlay} className='menuOverlay'></div> : null}
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
                    {l.status ? <p className='senderName message-status'>{l.status}</p> : null}
                    <p className='senderName'>{l.senderName}</p>
                    <p className='message'>{l.message}</p>
                    <button onClick={() => handleMenuOpen(l.id)} className='iconOpenMessageMore'>
                      <FontAwesomeIcon icon={faEllipsisVertical}/>
                    </button>
                    {menuIsOpen === l.id ?
                      <div className='messageMoreBtnList'>
                        {myAccount.type === 1 && l.senderId !== myAccount.id ?
                          <button onClick={() => handleBlockUser(l.senderId)}
                                  className='messageMoreBtn blockUser'>block</button> : null}
                        {l.senderId === myAccount.id || myAccount.type === 1 ?
                          <button className='messageMoreBtn'
                                  onClick={() => handleDeleteMessage(l.id)}>delete</button> : null}
                        {l.senderId !== myAccount.id ? <button className='messageMoreBtn'>report</button> : null}
                      </div> : null}
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