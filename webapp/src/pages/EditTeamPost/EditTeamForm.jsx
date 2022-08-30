/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from 'components/MdEditor';
import useFileInput from 'hooks/useFileInput';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillStack } from 'constant';
import teamApi from 'api/team.api';
import { skillStackParser } from 'service/skillStack.parser';
import useAxios from 'hooks/useAxios';

EditTeamForm.propTypes = {};

export default function EditTeamForm({ targetTeam, onClickback }) {
  const {
    id: teamId,
    name: teamName,
    content: teamContent,
    session: teamSession,
    img: teamImage,
    read,
    skills: teamSkills,
    commentCnt,
    likeCnt,
    user,
  } = targetTeam;

  const [state, execution, foreceRefetch] = useAxios({
    axiosInstance: teamApi.EDIT_TEAM_POST,
    immediate: false,
  });
  const [id, setId] = useState(teamId);
  // const [imageFile, fileHandler, setFile] = useFileInput(teamImage);
  const [session, onSessionChange, setSession] = useInput(teamSession);
  const [name, onNameChange] = useInput(teamName);
  const [mdcontent, setContent] = useState(teamContent);
  const [selectedSkills, setSelectedSkills] = useState(teamSkills);
  const [teamSkill, setTeamSkill] = useState();
  const [error, setError] = useState({ isError: false, msg: '' });

  const onSkillChange = useCallback(
    (e) => {
      setTeamSkill(e.target.value);
      setSelectedSkills((prev) => [...prev, e.target.value]);
    },
    [setTeamSkill],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = {
      name,
      img: 'imageFile',
      session,
      skills: selectedSkills,
      content: mdcontent,
    };
    await execution({
      id,
      data: submitData,
    });
    // TODO: 성공시 이동할 페이지 정해서 이동시키기
  };

  if (error.isError)
    return (
      <div>
        <button onClick={handleSubmit}>refetch</button>
      </div>
    );

  const parsedSkillStack = skillStackParser(skillStack);

  return (
    <div>
      <h3> 프로필 이미지 </h3>
      {/* <input type="file" accept="image/*" onChange={fileHandler} />
      <img src={imageFile} alt="profile" /> */}
      <form onSubmit={handleSubmit}>
        <div>
          팀이름 <input name="팀이름" onChange={onNameChange} value={name} />
        </div>
        <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
        <select value={teamSkill} onChange={onSkillChange}>
          {parsedSkillStack.map(({ id, value, label }) => (
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
