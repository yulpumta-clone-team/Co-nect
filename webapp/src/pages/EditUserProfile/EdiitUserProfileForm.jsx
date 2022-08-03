/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import userApi from 'api/user';
import { userType } from 'types/user.type';

EdiitUserProfileForm.propTypes = {
  targetUser: userType.isRequired,
  onClickback: PropTypes.func.isRequired,
};

export default function EdiitUserProfileForm({ targetUser, onClickback }) {
  const {
    id: userId,
    oauthId,
    email,
    name: userName,
    portfolio,
    slogan,
    content: userContent,
    img: userImage,
    hopeSession: userSession,
    job,
    skills: userSkills,
    status,
    commentCnt,
    likeCnt,
  } = targetUser;
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState(userId);
  const [imageFile, fileHandler, setFile] = useFileUploader(userImage);
  const [session, onSessionChange, setSession] = useInput(userSession);
  const [name, setName] = useState(userName);
  const [mdcontent, setContent] = useState(userContent);
  const [selectedSkills, setSelectedSkills] = useState(userSkills);
  const [userSkill, setUserSkill] = useState('');
  const [error, setError] = useState({ isError: false, msg: '' });

  const onSkillChange = useCallback(
    (e) => {
      setUserSkill(e.target.value);
      setSelectedSkills((prev) => [...prev, e.target.value]);
    },
    [setUserSkill],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = {
      name,
      img: imageFile,
      session,
      techs: selectedSkills,
      content: mdcontent,
    };
    try {
      const {
        status,
        data: { data },
      } = await userApi.EDIT_USER_PROFILE({ id, data: submitData });
      console.log('data', data);
      // TODO: 성공시 이동할 페이지 정해서 이동시키기
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        msg: error,
      });
    }
  };

  if (error.isError)
    return (
      <div>
        <button onClick={handleSubmit}>refetch</button>
      </div>
    );

  return (
    <div>
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
        <select value={session} onChange={onSessionChange}>
          {hopeSessionOption.map(({ id, value }) => (
            <option key={id} value={value}>
              {value}
            </option>
          ))}
        </select>
        <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
        <button onSubmit={handleSubmit}>제출</button>
      </form>
    </div>
  );
}
