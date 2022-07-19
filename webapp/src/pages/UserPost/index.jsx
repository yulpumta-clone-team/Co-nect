import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { handleFetcher } from 'utils';
import userApi from 'api/user';
import { POST_TYPE } from 'constant';
import { Board } from './style';

export default function UserPost() {
  const { userId: stringUserId } = useParams();
  const userId = Number(stringUserId);
  const navigate = useNavigate();
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClickback = () => {
    navigate(-1);
  };

  const fetchData = async () => {
    setLoading(true);
    const { value, error, isError } = await handleFetcher(userApi.GET_USER_DETAIL, { id: userId });
    if (isError) {
      console.log(error);
      return;
    }
    setTargetUser(value);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !targetUser) {
    return <Loader />;
  }
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
  } = targetUser;
  return (
    <div>
      <button onClick={onClickback}>back</button>
      <Board>
        <img src={img} alt="게시글" />
        <MarkdownViewer mdValue={content} />
        <div>이름 : {name}</div>
        <div>좋아요 개수 : {likeCnt}</div>
        <CommentContainer postType={POST_TYPE.USER} postWriter={name} postId={userId} />
      </Board>
    </div>
  );
}
