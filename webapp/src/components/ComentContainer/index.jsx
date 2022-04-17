import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getCookie, getLoginUserInfo } from 'utils/cookie';
import { getComment } from 'apiAction/comment';
import { isStatusOk } from 'constant/serverStatus';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const userInfo = getLoginUserInfo(); // {name, img, id}
  const onSubmit = useCallback(
    async ({ commentValue }) => {
      if (!userInfo) {
        alert('로그인을 먼저해주세요');
      } else {
        const newCommentData = { commentValue, ...userInfo };
        console.log(newCommentData);
        setValue('commentValue', '');
      }
    },
    [setValue, userInfo],
  );
  const fetchComments = useCallback(async () => {
    const {
      payload: { status, comments },
    } = await dispatch(getComment({ postType, postId }));
    if (isStatusOk(status)) {
      setComments(comments);
    }
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
    </div>
  );
}
CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default memo(CommentContainer);
