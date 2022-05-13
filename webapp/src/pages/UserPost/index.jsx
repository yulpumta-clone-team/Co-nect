import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { getUserDetail } from 'apiAction/user';
import { POST_TYPE } from 'utils';
import { Board } from './style';

function UserPost() {
  const { userId: id } = useParams();
  const userId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const { targetUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserDetail({ id: userId }));
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
        <img src={img} alt="게시글" />
        <MarkdownViewer mdValue={content} />
        <div>이름 : {name}</div>
        <div>좋아요 개수 : {like_cnt}</div>
        <CommentContainer postType={POST_TYPE.USER} postWriter={name} postId={userId} />
      </Board>
    </div>
  );
}

export default UserPost;
