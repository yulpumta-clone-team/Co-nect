import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileInput';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillStack } from 'constant';
import teamApi from 'api/team.api';
import { skillStackParserToSelectInput } from 'service/skillStack.parser';
import * as S from './style';

export default function NewTeamPost() {
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const [imageFile, fileHandler] = useFileUploader(null);

  const [teamName, onTeamChange] = useInput('');
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [mdcontent, setContent] = useState('');
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
    // TODO: inputValidation 추가
    const submitData = {
      name: teamName,
      session: hopeSession,
      skills: selectedSkills,
      content: mdcontent,
    };
    try {
      const response = await teamApi.POST_TEAM_POST({ submitData });
      console.log(response);
      // console.log('data', data);
      // TODO: 성공시 이동할 페이지 정해서 이동시키기
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        msg: error,
      });
    }
    navigate('/');
  };

  const parsedSkillStack = skillStackParserToSelectInput(skillStack);

  return (
    <S.Container>
      <button onClick={onClickback}>back</button>
      <br />
      <h3> 프로필 이미지 </h3>
      <input type="file" accept="image/*" onChange={fileHandler} />
      <img src={imageFile} alt="profile" />
      <form onSubmit={handleSubmit}>
        <div>
          팀이름 <input name="팀이름" onChange={onTeamChange} value={teamName} />
        </div>
        <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
        <select value={userSkill} onChange={onSkillChange}>
          {parsedSkillStack.map(({ id, value, label }) => (
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
        <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
        <button onSubmit={handleSubmit}>제출</button>
      </form>
    </S.Container>
  );
}
