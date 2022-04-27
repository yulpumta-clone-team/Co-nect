import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import { getUserDetail } from 'apiAction/user';
import { getCookie } from 'utils/cookie';
import { Board, Button, Box, Box2, Box3 } from './styleu';

function UserPost() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const userInfo = getCookie('userInfo');
  // const { myData } = useSelector((state) => state.auth);
  const myNickname = userInfo?.name;
  const myId = userInfo?.id;
  const { targetUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserDetail(Number(userId)));
  }, [dispatch, userId]);
  if (!targetUser) {
    return <Loader />;
  }
  const {
    user_id,
    name,
    content,
    session,
    img,
    read,
    job,
    comment_cnt,
    like_cnt,
    createdAt,
    updatedAt,
    comments,
  } = targetUser;
  return (
    <div>
      <button onClick={onClickback}>back</button>
      <Board>
        <Box3>{img}</Box3>
        <Box2>
          <MarkdownViewer mdValue={content} />
        </Box2>
        <div>
          <p>user 아이디 : {userId}</p>
          <p>이름 : {name}</p>
        </div>
        <Box2>좋아요 개수 : {like_cnt}</Box2>
      </Board>
    </div>
  );
}

UserPost.propTypes = {};

export default UserPost;
