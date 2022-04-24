import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getComment, postComment } from 'apiAction/comment';
import { isStatusOk } from 'constant/serverStatus';
import { useNavigate } from 'react-router-dom';
import { handleFetcher, setPostIdOnSubmitData } from 'utils';
import { getLoginUserInfo } from 'utils/cookie';
import Comment from 'components/Comment';

function CommentContainer({ postType, postId }) {
  console.log('Comment Container Type: ', postType);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const userInfo = getLoginUserInfo(); // {name, img, id}

  const onSubmit = useCallback(
    async ({ commentValue }) => {
      if (!userInfo) {
        alert('로그인을 먼저해주세요');
      } else {
        const { name, id } = userInfo;
        const newCommentData = setPostIdOnSubmitData(postType, {
          writer: name, // 작성자 이름
          parentId: null, // 아무것도 안넣으면 대댓글아님
          secret: false,
          content: commentValue,
        });

        const { isError, value: newComment } = await handleFetcher(
          postComment,
          newCommentData,
          dispatch,
        );
        if (isError) {
          return;
        }
        setComments((prev) => [...prev, newComment]);
        setValue('commentValue', '');
      }
    },
    [postType, setValue, userInfo],
  );

  const fetchComments = useCallback(async () => {
    const { isError, value: comments } = await handleFetcher(
      getComment,
      { postType, postId },
      dispatch,
    );
    if (isError) {
      return;
    }
    setComments(comments);
  }, [postId, postType]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
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
      {comments.length !== 0 &&
        comments.map(({ id, teamId, userId, ...commentInfo }) => {
          const postId = teamId || userId;
          return <Comment key={id} id={id} postId={postId} commentInfo={commentInfo} />;
        })}
    </div>
  );
}
CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default memo(CommentContainer);
