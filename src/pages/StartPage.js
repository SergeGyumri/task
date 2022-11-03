import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Loading from "../components/Loading";
import {useNavigate} from "react-router-dom";
import Token from "../services/Token";
import Errors from '../components/Errors'
import {useDispatch, useSelector} from "react-redux";
import {
  getFormRequest,
} from "../store/actions/form";
import {goToChatRequest, logOut} from "../store/actions/users";

function StartPage() {
  const dispatch = useDispatch();
  const [selectedAgeBtn, setSelectedAgeBtn] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const agesListRequestStatus = useSelector(store => store.form.agesListRequestStatus);
  const ages = useSelector(store => store.form.ages);
  const interests = useSelector(store => store.form.interests);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(logOut)
    dispatch(getFormRequest());
  }, [])

  const handlePressAgeBtn = (ev, id) => {
    ev.preventDefault();
    setSelectedAgeBtn(id);
  }
  const handleChangeName = (ev) => {
    ev.preventDefault();
    setUserName(ev.target.value);
  }

  const handleSearchRoom = async (ev) => {

    ev.preventDefault();
    try {
      if (!loading) {
        setErrors({});
        setLoading(!loading);
        dispatch(goToChatRequest({
          ageId: selectedAgeBtn,
          interestId: selectedInterest,
          userName
        }, (err, data) => {
          if (err) {
            setErrors(err);
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
      <div className="content">
        <Loading status={loading}/>
        <Errors errors={errors}/>
        {!loading ? (
          <form className='form'>
            <input value={userName} type="text" className="chooseName" maxLength='15'
                   placeholder='choose Name'
                   onChange={handleChangeName}/>
            {agesListRequestStatus === 'request' ? <Loading status={true}/> :
              <>
                <div className="btns">
                  {ages.length ? ages.map((e) => {
                    return <button key={e.id}
                                   className={`selectAgeBtn ${selectedAgeBtn === e.id ? 'ageBtnActive' : ''}`}
                                   onClick={(ev) => handlePressAgeBtn(ev, e.id)}>{e.value}</button>
                  }) : <p className='notFound'>sorry ages not found :( </p>}
                </div>

                <div className="selectsBlock">
                  {interests.length ? <Select
                    className='interestSelect'
                    placeholder='Choose interest'
                    value={interests.find(i => i.id === selectedInterest)}
                    onChange={v => setSelectedInterest(v.id)}
                    options={interests}
                    getOptionValue={item => item.id}
                    getOptionLabel={item => item.value}
                  /> : <p className='notFound'>sorry interests not found :(</p>}
                </div>
              </>}

            {ages.length && interests.length ?
              <button className='doneBtn' onClick={handleSearchRoom}>search</button> : null}
          </form>) : null}

      </div>
    </div>);
}

export default StartPage;
