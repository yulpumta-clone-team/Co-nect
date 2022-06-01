import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { postTeamPost } from 'apiAction/team';
import { useDispatch } from 'react-redux';
import { isStatusOk } from 'constant/serverStatus';
import { hopeSessionOption, skillOptions } from 'constant';

function NewTeamPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const [imageFile, fileHandler] = useFileUploader('');

  const [teamName, onTeamChange] = useInput('');
  // const [userImg, onImgChange] = useInput('');
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
      const submitData = {
        name: teamName,
        img: imageFile,
        session: hopeSession,
        techs: selectedSkills,
        content: mdcontent,
      };

      const {
        payload: { status, data },
      } = await dispatch(postTeamPost(submitData));
      console.log('\nstatus: ', status, '\ndata: ', data);
      // if (status && isStatusOk(status)) {
      //   navigate('/');
      // }
    },
    [dispatch, hopeSession, imageFile, mdcontent, selectedSkills, teamName],
  );
  return (
    <>
      <button onClick={onClickback}>back</button>
      <br />
      <h3> 프로필 이미지 </h3>
      <input type="file" accept="image/*" onChange={fileHandler} />
      {/* <button onClick={fileHandler}> 이미지 업로드 ㅈ</button> */}
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
