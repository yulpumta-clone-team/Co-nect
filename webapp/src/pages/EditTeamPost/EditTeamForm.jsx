/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { handleFetcher } from 'utils';
import teamApi from 'api/team';

EditTeamForm.propTypes = {};

export default function EditTeamForm({ targetTeam, onClickback }) {
  const {
    id: teamId,
    name: teamName,
    content: teamContent,
    session: teamSession,
    image: teamImage,
    read,
    skills: teamSkills,
    commentCnt,
    likeCnt,
    user,
  } = targetTeam;
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(teamId);
  const [imageFile, fileHandler, setFile] = useFileUploader(teamImage);
  const [session, onSessionChange, setSession] = useInput(teamSession);
  const [name, onNameChange] = useInput(teamName);
  const [mdcontent, setContent] = useState(teamContent);
  const [selectedSkills, setSelectedSkills] = useState(teamSkills);
  const [teamSkill, setTeamSkill] = useState();
  const onSkillChange = useCallback(
    (e) => {
      setTeamSkill(e.target.value);
      setSelectedSkills((prev) => [...prev, e.target.value]);
    },
    [setTeamSkill],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const submitData = {
        name,
        img: imageFile,
        session,
        skills: selectedSkills,
        content: mdcontent,
      };

      const { value, error, isError } = await handleFetcher(teamApi.EDIT_TEAM_POST, {
        id,
        data: submitData,
      });
      if (isError) {
        console.log(error);
        return;
      }
      onClickback();
    },
    [id, imageFile, mdcontent, onClickback, selectedSkills, session, name],
  );
  return (
    <div>
      <h3> 프로필 이미지 </h3>
      <input type="file" accept="image/*" onChange={fileHandler} />
      <img src={imageFile} alt="profile" />
      <form onSubmit={handleSubmit}>
        <div>
          팀이름 <input name="팀이름" onChange={onNameChange} value={name} />
        </div>
        <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
        <select value={teamSkill} onChange={onSkillChange}>
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
