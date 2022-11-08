import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Loading from "../components/Loading";
import {useNavigate} from "react-router-dom";
import Token from "../services/Token";
import Errors from '../components/Errors'
import _ from 'lodash'
import {useDispatch, useSelector} from "react-redux";
import {
  addFieldRequest,
  getFormRequest,
} from "../store/actions/form";
import {getMyAccount, goToChatRequest} from "../store/actions/users";

function StartPage() {
  const dispatch = useDispatch();
  const [selectedAgeBtn, setSelectedAgeBtn] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addAgeFieldInput, setAddAgeFieldInput] = useState('');
  const [addInterestFieldInput, setAddInterestFieldInput] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const agesListRequestStatus = useSelector(store => store.form.agesListRequestStatus);
  const myAccount = useSelector(store => store.users.account);
  const token = useSelector(store => store.users.token);
  const ages = useSelector(store => store.form.ages);
  const interests = useSelector(store => store.form.interests);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(getMyAccount())
      dispatch(getFormRequest());
    }
  }, [token])

  const handlePressAgeBtn = (ev, id) => {
    ev.preventDefault();
    setSelectedAgeBtn(id);
  }
  const handleChangeName = (ev) => {
    ev.preventDefault();
    setUserName(ev.target.value);
  }
  const handleUserLogOut = (ev) => {
    ev.preventDefault()
    Token.delete();
    navigate('/login');
  }
  const newAgeChange = (ev) => {
    ev.preventDefault();
    setAddAgeFieldInput(ev.target.value);
  }
  const newInterestChange = (ev) => {
    ev.preventDefault();
    setAddInterestFieldInput(ev.target.value);
  }
  const handelAddNewField = (ev) => {
    ev.preventDefault();
    dispatch(addFieldRequest({newAge: addAgeFieldInput, newInterest: addInterestFieldInput}))
    setAddAgeFieldInput('');
    setAddInterestFieldInput('');
  }
  const handleSearchRoom = async (ev) => {
    ev.preventDefault();
    try {
      if (!loading) {
        setErrors({});
        setLoading(!loading);
        dispatch(goToChatRequest({
          ageId: selectedAgeBtn, interestId: selectedInterest, userName
        }, (err, data) => {
          if (err) {
            setErrors(err.errors);
            setLoading(false);
          } else if (data.status === 'ok') {
            Token.setToken(data.token);
            navigate(`/chat`);
          }
        }))
      } else {
        setLoading(!loading);
      }
    } catch (e) {
    }
  }

  return (
    <div className='wrapper'>
      <div className="err-block">
        <Errors errors={errors}/>
      </div>
      {!loading ? (
        <form className='form'>
          <div className="welcomeBigBlock">
            {agesListRequestStatus === 'request' ? <Loading status={true}/> :
              <>
                <div className="welcomeMiniBlock">
                  <input value={userName} type="text" className="g-input" maxLength='15'
                         placeholder='choose Name'
                         onChange={handleChangeName}/>
                </div>
                <div className="welcomeMiniBlock">
                  {ages.length ? ages.map((e) => {
                    return <button key={e.id}
                                   className={`selectAgeBtn ${selectedAgeBtn === e.id ? 'ageBtnActive' : ''}`}
                                   onClick={(ev) => handlePressAgeBtn(ev, e.id)}>{e.value}</button>
                  }) : <p className='notFound'>sorry ages not found :( </p>}
                  {myAccount.type === 1 ?
                    <>
                      <input value={addAgeFieldInput} onChange={(ev) => newAgeChange(ev)} placeholder='new age'
                             className='g-input addAgeFieldInput'
                             type="text"/>
                      {addAgeFieldInput ?
                        <button className={`selectAgeBtn`} onClick={handelAddNewField}>add Field</button>
                        : null}
                    </> : null}

                </div>
                <div className="welcomeMiniBlock">
                  {interests.length ?
                    <>
                      <Select
                        className='interestSelect'
                        placeholder='Choose interest'
                        value={interests.find(i => i.id === selectedInterest)}
                        onChange={v => setSelectedInterest(v.id)}
                        options={interests}
                        getOptionValue={item => item.id}
                        getOptionLabel={item => item.value}
                      />

                      {myAccount.type === 1 ?
                        <>
                          <input value={addInterestFieldInput} onChange={(ev) => newInterestChange(ev)}
                                 placeholder='new interest'
                                 className='g-input addAgeFieldInput'
                                 type="text"/>
                          {addInterestFieldInput ?
                            <button className={`selectAgeBtn addFieldBtn`} onClick={handelAddNewField}>add
                              Field</button>
                            : null}
                        </> : null}
                    </>
                    : <p className='notFound'>sorry interests not found :(</p>}
                </div>
                <div className="welcomeMiniBlock">
                  {ages.length && interests.length ?
                    <button className='g-btn search' onClick={handleSearchRoom}>search</button> : null}
                </div>
              </>}
          </div>
        </form>) : null}
      <button className='g-btn welcomeLogOut' onClick={handleUserLogOut}>Log Out</button>
    </div>
  );
}

export default StartPage;
