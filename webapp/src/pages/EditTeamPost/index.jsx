import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { useDispatch } from 'react-redux';
import { patchTeamPost } from 'apiAction/team';
import { handleFetcher } from 'utils';
import { Board, MdEditorContainer } from './style';

function EditTeamProfile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const targetTeam = location.state;
  const { id, name, content, session, img, read, skills, commentCnt, likeCnt, user } = targetTeam;

  const [imageFile, fileHandler] = useFileUploader(img);
  const [teamName, onTeamChange, setTeam] = useInput(name);
  const [hopeSession, onHopeSessionChange] = useInput(session);
  const [userName, setName] = useState(user.name);
  const [mdcontent, setContent] = useState(content);
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(skills);

  const onClickback = () => {
    navigate(-1);
  };

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
        img: imageFile,
        session: hopeSession,
        skills: selectedSkills,
        content: mdcontent,
      };

      const { value, error, isError } = await handleFetcher(patchTeamPost, { id, submitData });
      if (isError) {
        console.log(error);
        return;
      }
      onClickback();
    },
    [dispatch, hopeSession, id, imageFile, mdcontent, selectedSkills, teamName],
  );

  return (
    <Board>
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
        <MdEditorContainer>
          <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
        </MdEditorContainer>
        <button onSubmit={handleSubmit}>제출</button>
      </form>
    </Board>
  );
}

export default EditTeamProfile;
