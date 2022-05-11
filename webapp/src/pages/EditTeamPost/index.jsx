import React, { useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import Loader from 'components/Loader';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { useDispatch } from 'react-redux';
import { patchTeamPost } from 'apiAction/team';
import { Board, MdEditorContainer } from './style';

function EditTeamProfile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const targetTeam = location.state;
  console.log('targetTeam', targetTeam);
  const {
    team_id,
    team_name,
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
  } = targetTeam;

  const [imageFile, fileHandler] = useFileUploader(img);
  const [teamName, onTeamChange, setTeam] = useInput(team_name);
  const [hopeSession, onHopeSessionChange] = useInput(session);
  const [userName, setName] = useState(name);
  const [mdcontent, setContent] = useState(content);
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

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
        techs: selectedSkills,
        content: mdcontent,
      };

      try {
        dispatch(patchTeamPost({ id: team_id, editTeamInfo: submitData }));
        onClickback();
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, hopeSession, imageFile, mdcontent, onClickback, selectedSkills, teamName, team_id],
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

export default React.memo(EditTeamProfile);
