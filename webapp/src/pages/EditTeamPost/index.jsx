import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { handleFetcher } from 'utils';
import teamApi from 'api/team';
import { Board, MdEditorContainer } from './style';

export default function EditTeamPost() {
  const { teamId: stringTeamId } = useParams();
  const teamId = Number(stringTeamId);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(-1);
  const [imageFile, fileHandler, setFile] = useFileUploader('');
  const [session, onSessionChange, setSession] = useInput('');
  const [teamName, onTeamNameChange, setTeamName] = useInput('');
  const [mdcontent, setContent] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [teamSkill, setTeamSkill] = useState('');

  const onClickback = () => {
    navigate(-1);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { value, error } = await handleFetcher(teamApi.GET_TEAM_DETAIL, { id: teamId });
      const { id, name, content, session, img, read, skills, commentCnt, likeCnt, user } = value;
      setId(id);
      setFile(img);
      setSession(session);
      setTeamName(name);
      setContent(content);
      setSelectedSkills(skills);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        name: teamName,
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
    [id, imageFile, mdcontent, onClickback, selectedSkills, session, teamName],
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
          팀이름 <input name="팀이름" onChange={onTeamNameChange} value={teamName} />
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
        <MdEditorContainer>
          <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
        </MdEditorContainer>
        <button onSubmit={handleSubmit}>제출</button>
      </form>
    </Board>
  );
}
