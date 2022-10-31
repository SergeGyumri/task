import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Loading from "../components/Loading";
import {useNavigate} from "react-router-dom";
import Token from "../services/Token";
import _ from 'lodash'
import {connect, useDispatch, useSelector} from "react-redux";
import {
  getFormRequest,
} from "../store/actions/form";
import {goToChatRequest, logOut} from "../store/actions/users";
import Api from "../Api";

function StartPage() {
  const dispatch = useDispatch();
  const [selectedAgeBtn, setSelectedAgeBtn] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const agesListRequestStatus = useSelector(store => store.form.agesListRequestStatus);
  const ages = useSelector(store => store.form.ages);
  const interests = useSelector(store => store.form.interests);
  const [errors, setErrors] = useState([])
  useEffect(() => {
    dispatch(logOut)
    dispatch(getFormRequest());
  }, [])

  const handlePressAgeBtn = (ev, id) => {
    ev.preventDefault();
    setSelectedAgeBtn(id);
  }

  const handleSearchRoom = async (ev) => {
    ev.preventDefault();
    try {
      if (!loading) {
        setErrors([]);
        setLoading(!loading);
        dispatch(goToChatRequest({ageId: selectedAgeBtn, interestId: selectedInterest}, (err, data) => {
          if (err) {
            setErrors(err.errors.error);
            setLoading(false);
          } else if (data.status === 'ok') {
            Token.setToken(data.token);
            navigate(`/chat`);
          }
        }))
      } else {
        Api.cancelRequest()
        setLoading(!loading);
      }
    } catch (e) {

    }
  }

  let interestsField;
  if (Array.isArray(interests)) {
    interestsField = interests.map(item => ({
      id: item.id, value: item.id, label: item.value,
    }))
  }
  return (
    <div className='wrapper'>
      <div className="content">
        <Loading status={loading}/>
        {errors.length ? errors.map(e => (
          <h3 key={_.uniqueId()} className='errors'>{e}!</h3>
        )) : null}
        {!loading ? (
          <form className='form'>
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
                    value={interestsField.find(i => i.id === selectedInterest)}
                    onChange={v => setSelectedInterest(v.id)}
                    options={interestsField}
                    // getOptionValue={o => o.id}
                  /> : <p className='notFound'>sorry interests not found :(</p>}
                </div>
              </>}

            {ages.length && interests.length ?
              <button className='doneBtn' onClick={handleSearchRoom}>search</button> : null}
          </form>) : <button className='doneBtn' onClick={handleSearchRoom}>cancel</button>}

      </div>
    </div>);
}

export default StartPage;