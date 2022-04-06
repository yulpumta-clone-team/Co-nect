import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from 'pages/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/CommentContainer';
import { getUserDetail } from 'apiAction/user';
import { handleComment } from 'utils/handleComment';
import { getCookie } from 'utils/cookie';
import { USER } from 'constant';
import { Board, Button, Box, Box2, Box3 } from './styleu';

function UserPost() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    // watch,
  } = useForm({
    defaultValues: {},
  });
  const { userId } = useParams();
  const dispatch = useDispatch();
  const dispatchComment = handleComment(USER, dispatch);
  const navigate = useNavigate();
  // const [commentValue, commentHander, setCommentValue] = useInput('');
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
  const onSubmit = async ({ commentValue }) => {
    if (!userInfo) {
      alert('로그인을 먼저해주세요');
    } else {
      const newCommentData = {
        content: commentValue,
        writter_id: myId,
        user_id,
        nickname: myNickname,
        isSecret: false,
      };
      dispatchComment.postComment(newCommentData);
      setValue('commentValue', '');
    }
    // setError('extraError', { message: 'Server offLine.' });
  };
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
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('commentValue', {
              required: '내용을 입력해주세요.',
            })}
            placeholder="댓글을 입력하세요."
          />
          <span>{errors?.commentValue?.message}</span>
          <span>{errors?.extraError?.message}</span>
          <button type="submit">작성</button>
        </form>
        <CommentContainer postId={user_id} comments={comments} dispatchComment={dispatchComment} />
      </Board>
    </div>
  );
}

UserPost.propTypes = {};

export default UserPost;
