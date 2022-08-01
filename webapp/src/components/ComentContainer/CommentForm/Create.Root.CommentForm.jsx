import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { setPostIdOnSubmitData } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';

CreateRootCommentForm.propTypes = {
  secret: PropTypes.bool.isRequired,
};

export function CreateRootCommentForm({ secret }) {
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { postType, postId } = useCommentsState();
  const { postCommentApi } = useCommentsAction();
  const [isSecret, setIsSecret] = useState(secret);

  const onSubmit = async ({ commentValue }) => {
    if (!userInfo) {
      alert('로그인을 먼저해주세요');
    }
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: userInfo?.name,
      secret: isSecret,
      content: commentValue,
    });
    await postCommentApi({ postType, data: newCommentData });
    setIsSecret(false);
  };
  return (
    <S.FormBox style={{ marginBottom: '12px' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('CreateRootCommentForm', {
            required: '내용을 입력해주세요.',
          })}
          defaultValue=""
          placeholder="댓글을 입력하세요."
        />
        <span>{errors?.commentValue?.message}</span>
        <span>{errors?.extraError?.message}</span>
      </form>
      <span>비밀댓글여부</span>
      <input type="checkbox" checked={isSecret} onChange={() => setIsSecret((prev) => !prev)} />
      <button type="submit">작성</button>
    </S.FormBox>
  );
}
