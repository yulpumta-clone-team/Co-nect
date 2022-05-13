/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail, patchUserProfile } from 'apiAction/user';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import Loader from 'components/Loader';
import { Board, MdEditorContainer } from './style';

const USER_ID = 3;

function EditUserProfile(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const { targetUser } = useSelector((state) => state.user);
  const [imageFile, fileHandler] = useFileUploader(targetUser?.img);
  const [hopeSession, onHopeSessionChange] = useInput(targetUser?.session);
  const [userName, setName] = useState(targetUser?.name);
  const [mdcontent, setContent] = useState(targetUser?.content);
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(targetUser?.skills);

  useEffect(() => {
    dispatch(getUserDetail({ id: USER_ID }));
  }, [dispatch]);

  if (!targetUser) {
    return <Loader />;
  }

  const {
    user_id,
    name,
    content,
    session,
    img,
    read,
    job,
    skills,
    like_cnt,
    createdAt,
    updatedAt,
    comments,
  } = targetUser;

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
        name: userName,
        img: imageFile,
        session: hopeSession,
        techs: selectedSkills,
        content: mdcontent,
      };

      try {
        dispatch(patchUserProfile({ id: user_id, editTeamInfo: submitData }));
        onClickback();
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, hopeSession, imageFile, mdcontent, onClickback, selectedSkills, userName, user_id],
  );

  return (
    <Board>
      <button onClick={onClickback}>back</button>
      <br />
      <h3> 프로필 이미지 </h3>
      <input type="file" accept="image/*" onChange={fileHandler} />
      <img src={imageFile} alt="profile" />
      <form onSubmit={handleSubmit}>
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
        <MdEditorContainer>
          <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
        </MdEditorContainer>
        <button onSubmit={handleSubmit}>제출</button>
      </form>
    </Board>
  );
}

EditUserProfile.propTypes = {};

export default EditUserProfile;
