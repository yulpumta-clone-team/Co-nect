import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import { useSelector } from 'react-redux';
import { Viewer } from '@toast-ui/react-editor';
import { Board, Box2, Box3 } from './styleep';

function EditTeamProfile() {
  const location = useLocation();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(teamName);
    // console.log(editorRef.current?.getInstance().getMarkdown());
  };
  const { team_name, content, name, img, like_cnt } = location.state;
  // console.log(team_name);
  const [userName, setName] = useState(name);
  const [teamName, setTeam] = useState(team_name);
  const [userImg, setImg] = useState(img);
  const onNameChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setName(e.target.value);
  };
  const onTeamChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setTeam(e.target.value);
  };
  const onImgChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setImg(e.target.value);
  };
  const resetVal = () => {
    setName(name);
    setTeam(team_name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button onClick={onClickback}>back</button>
        <Board>
          <Box3>
            <input name="사진" onChange={onImgChange} value={userImg} />
          </Box3>
          <div>
            <MarkdownEditor mdValue={content} />
          </div>
          <Box2>
            <div>
              이름 <input name="이름" onChange={onNameChange} value={userName} />
            </div>
            <div>
              팀이름 <input name="팀이름" onChange={onTeamChange} value={teamName} />
            </div>
          </Box2>
          <div>
            <button onClick={resetVal}>reset</button>
          </div>
          <div>좋아요 개수 {like_cnt}</div>
          <Box2>
            <input type="submit" value="저장" />
          </Box2>
        </Board>
      </div>
    </form>
  );
}

export default React.memo(EditTeamProfile);
