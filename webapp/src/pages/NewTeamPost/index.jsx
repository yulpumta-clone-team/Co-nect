import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { postTeamPost } from 'apiAction/team';
import { useDispatch } from 'react-redux';
import { hopeSessionOption, skillOptions } from 'constant';
import { handleFetcher } from 'utils';

function NewTeamPost() {
  const dispatch = useDispatch();
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
      // TODO: inputValidation 추가
      const submitData = {
        name: teamName,
        img: imageFile,
        session: hopeSession,
        skills: selectedSkills,
        content: mdcontent,
      };

      const { value, error, isError } = await handleFetcher(postTeamPost, submitData);
      if (isError) {
        console.log(error);
        return;
      }
      navigate('/');
    },
    [hopeSession, imageFile, mdcontent, navigate, selectedSkills, teamName],
  );
  return (
    <>
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

export default NewTeamPost;
