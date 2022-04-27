import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { deleteComment, getComment, patchComment, postComment } from 'apiAction/comment';
import { handleFetcher, setPostIdOnSubmitData } from 'utils';
import { getLoginUserInfo } from 'utils/cookie';
import Comment from 'components/Comment';

const DEFAULT_TARGET = -1;

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
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const userInfo = getLoginUserInfo(); // {name, img, id}

  const resetTarget = useCallback(() => {
    setEditTargetCommentId(DEFAULT_TARGET);
  }, []);

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
          { postType, newCommentData },
          dispatch,
        );
        if (isError) {
          return;
        }
        setComments((prev) => [...prev, newComment]);
        setValue('commentValue', '');
      }
    },
    [dispatch, postType, setValue, userInfo],
  );

  const handleSubmitEditComment = useCallback(
    async (editContent) => {
      const newCommentData = setPostIdOnSubmitData(postType, editContent);
      const { isError, value: editedComment } = await handleFetcher(
        patchComment,
        { postType, postId, newCommentData },
        dispatch,
      );
      if (isError) {
        return;
      }
      const newComments = comments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment,
      );
      setComments(newComments);
      resetTarget();
    },
    [comments, dispatch, postId, postType, resetTarget],
  );
  const handleClickDeleteButton = useCallback(
    async (id) => {
      const { isError } = await handleFetcher(deleteComment, { postType, id }, dispatch);
      if (isError) {
        return;
      }
      const newComments = comments.filter((comment) => comment.id !== id);
      setComments(newComments);
    },
    [comments, dispatch, postType],
  );

  const handleChangeToSecret = useCallback(
    (id) => {
      const newComments = comments.map((comment) =>
        comment.id === id ? { ...comment, secret: !comment.secret } : comment,
      );
      setComments(newComments);
    },
    [comments],
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
  }, [dispatch, postId, postType]);

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
          return (
            <Comment
              key={id}
              id={id}
              postId={postId}
              commentInfo={commentInfo}
              editTargetCommentId={editTargetCommentId}
              setEditTargetCommentId={setEditTargetCommentId}
              handleSubmitEditComment={handleSubmitEditComment}
              handleClickDeleteButton={handleClickDeleteButton}
              handleChangeToSecret={handleChangeToSecret}
            />
          );
        })}
    </div>
  );
}
CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default memo(CommentContainer);
