import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import Loader from 'components/Loader';
import { handleFetcher } from 'utils';
import userApi from 'api/user';
import { Board, MdEditorContainer } from './style';

const USER_ID = 3;

function EditUserProfile() {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(-1);
  const [imageFile, fileHandler, setFile] = useFileUploader('');
  const [session, onSessionChange, setSession] = useInput('');
  const [userName, setName] = useState('');
  const [mdcontent, setContent] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [userSkill, setUserSkill] = useState('');

  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { value, error } = await handleFetcher(userApi.GET_USER_DETAIL, { id: USER_ID });
      const {
        id,
        oauthId,
        email,
        name,
        portfolio,
        slogan,
        content,
        img,
        hopeSession,
        job,
        skills,
        status,
        commentCnt,
        likeCnt,
      } = value;
      setId(id);
      setFile(img);
      setSession(hopeSession);
      setName(name);
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
        session,
        techs: selectedSkills,
        content: mdcontent,
      };

      try {
        userApi.EDIT_USER_PROFILE({ id, data: submitData });
        onClickback();
      } catch (error) {
        console.error(error);
      }
    },
    [userName, imageFile, session, selectedSkills, mdcontent, id, onClickback],
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

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

EditUserProfile.propTypes = {};

export default EditUserProfile;
