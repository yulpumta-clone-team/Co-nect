import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import { Board, Box2, Box3 } from './style';

function NewPost() {
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(teamName);
    console.log(mdcontent);
    // console.log(editorRef.current?.getInstance().getMarkdown());
  };
  const [userName, setName] = useState('');
  const [teamName, setTeam] = useState('');
  const [userImg, setImg] = useState('');
  const [mdcontent, setContent] = useState('');
  // console.log(team_name);
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onTeamChange = (e) => {
    setTeam(e.target.value);
  };
  const onImgChange = (e) => {
    setImg(e.target.value);
  };
  return (
    <>
      <button onClick={onClickback}>back</button>
      <input type="file" name="사진" onChange={onImgChange} value={userImg} />
      <form onSubmit={handleSubmit}>
        <div>
          <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
        </div>
        <div>
          이름 <input name="이름" onChange={onNameChange} value={userName} />
        </div>
        <div>
          팀이름 <input name="팀이름" onChange={onTeamChange} value={teamName} />
        </div>
        <input type="submit" value="저장" />
      </form>
    </>
  );
}

export default NewPost;
