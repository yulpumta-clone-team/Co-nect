import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  deleteComment,
  getComment,
  patchComment,
  postComment,
  postCommentLike,
} from 'apiAction/comment';
import { handleFetcher, setPostIdOnSubmitData } from 'utils';
import { getUserCookie } from 'utils/cookie';
import Comment from 'components/ComentContainer/Comment';

const DEFAULT_TARGET = -1;

function CommentContainer({ postType, postWriter, postId }) {
  // console.log('Comment Container Type: ',postWriter,  postType);
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
  const userInfo = getUserCookie(); // {name, img, id}

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
      const getNewComments = comments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment,
      );
      setComments(getNewComments);
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
      const removeDeletedTarget = (prev) => prev.filter((comment) => comment.id !== id);
      setComments(removeDeletedTarget);
    },
    [dispatch, postType],
  );

  // TODO: 서버와 api 연결하기
  const handleChangeToSecret = useCallback((id) => {
    const getNewComments = (prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, secret: !comment.secret } : comment,
      );
    setComments(getNewComments);
  }, []);

  const handleClickLikeThumb = useCallback(
    async (id, loggedInUserId, isLikesContainUserId) => {
      const { isError } = await handleFetcher(postCommentLike, { postType, id }, dispatch);
      if (isError) {
        return;
      }
      const handleLikeUserId = (oldComment) => {
        const targetLikes = [...oldComment.feeling];
        if (isLikesContainUserId) {
          const newLikes = targetLikes.filter((id) => id !== loggedInUserId);
          return { ...oldComment, feeling: newLikes };
        }
        targetLikes.push(loggedInUserId);
        return { ...oldComment, feeling: targetLikes };
      };
      const getNewComments = (prev) =>
        prev.map((comment) => (comment.id === id ? handleLikeUserId(comment) : comment));
      setComments(getNewComments);
    },
    [dispatch, postType],
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
      <form
        style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}
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
      {comments.length !== 0 &&
        comments.map(({ id, teamId, userId, ...commentInfo }) => {
          const postId = teamId || userId;
          return (
            <Comment
              key={id}
              id={id}
              postId={postId}
              postWriter={postWriter}
              commentInfo={commentInfo}
              editTargetCommentId={editTargetCommentId}
              setEditTargetCommentId={setEditTargetCommentId}
              handleSubmitEditComment={handleSubmitEditComment}
              handleClickDeleteButton={handleClickDeleteButton}
              handleChangeToSecret={handleChangeToSecret}
              handleClickLikeThumb={handleClickLikeThumb}
            />
          );
        })}
    </div>
  );
}
CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default memo(CommentContainer);
