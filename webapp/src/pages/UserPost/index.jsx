import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { getUserDetail } from 'apiAction/user';
import { handleFetcher, POST_TYPE } from 'utils';
import { Board } from './style';

function UserPost() {
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
    try {
      const { value, error } = await handleFetcher(getUserDetail, { id: userId });
      setTargetUser(value);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

export default UserPost;
