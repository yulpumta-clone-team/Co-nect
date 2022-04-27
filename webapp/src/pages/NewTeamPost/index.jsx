import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useInput from 'hooks/useInput';
import { postTeamPost } from 'apiAction/team';
import { useDispatch } from 'react-redux';
import { isStatusOk } from 'constant/serverStatus';
import { hopeSessionOption, skillOptions } from 'constant';
// import { Board, Box2, Box3 } from './style';

function NewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };

  const [teamName, onTeamChange] = useInput('');
  const [userImg, onImgChange] = useInput('');
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [mdcontent, setContent] = useState('');

  const onSkillChange = useCallback(
    (e) => {
      setUserSkill(e.target.value);
      setSelectedSkills((prev) => [...prev, e.target.value]);
    },
    [setUserSkill],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const submitData = {
        name: teamName,
        img: userImg,
        session: hopeSession,
        techs: selectedSkills,
        content: mdcontent,
      };
      const {
        status,
        payload: { code, data, message },
      } = await dispatch(postTeamPost(submitData));
      console.log('\nstatus: ', status, '\ncode: ', code, '\ndata: ', data, '\nmessage: ', message);
      // if (isStatusOk(status)) {
      //   navigate('/');
      //   window.location.reload();
      // }
    },
    [dispatch, hopeSession, mdcontent, navigate, selectedSkills, teamName, userImg],
  );
  return (
    <>
      <button onClick={onClickback}>back</button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="사진" onChange={onImgChange} value={userImg} />
        <div>
          팀이름 <input name="팀이름" onChange={onTeamChange} value={teamName} />
        </div>
        <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
        <select value={userSkill} onChange={onSkillChange}>
          {skillOptions.map(({ id, value, label }) => (
            <option key={id} value={value}>
              {label}
            </option>
          ))}
        </select>
        <span>희망 작업 기간</span>
        <select value={hopeSession} onChange={onHopeSessionChange}>
          {hopeSessionOption.map(({ id, value }) => (
            <option key={id} value={value}>
              {value}
            </option>
          ))}
        </select>
        <div>
          <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
        </div>
        <button onSubmit={handleSubmit}>제출</button>
      </form>
    </>
  );
}

export default NewPost;
