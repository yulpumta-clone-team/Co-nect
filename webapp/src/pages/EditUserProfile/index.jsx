import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import { useSelector } from 'react-redux';
import { Viewer } from '@toast-ui/react-editor';
import { Board, Box2, Box3 } from './styleeu';

function EditUserProfile(props) {
  const location = useLocation();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const editUserData = {
    name: '임시',
    img: 'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png',
    content: '임시 프로필',
    userId: 123123123,
    like_cnt: 3,
  };
  const { name, img, content, userId, like_cnt } = editUserData;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName);
    // console.log(editorRef.current?.getInstance().getMarkdown());
  };

  const [userName, setName] = useState(name);
  const [userImg, setImg] = useState(img);
  const [mdcontent, setContent] = useState(content);
  const onNameChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setName(e.target.value);
  };
  const onImgChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setImg(e.target.value);
  };
  const resetVal = () => {
    setName(name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button onClick={onClickback}>back</button>
        <Board>
          <Box3>
            {/* <input name="사진" onChange={onImgChange} value={userImg} /> */}
            <img style={{ width: '300px', heigth: '300px' }} src={userImg} alt="프로필 이미지" />
          </Box3>
          <div>
            <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
          </div>
          <Box2>
            <div>
              <p>user 아이디 {userId}</p>
              <p>
                이름 <input name="이름" onChange={onNameChange} value={userName} />
              </p>
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

EditUserProfile.propTypes = {};

export default EditUserProfile;
