import React, { useEffect, useState } from 'react';
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { postType, postId } = useCommentsState();
  const { postCommentApi } = useCommentsAction();
  const [isSecret, setIsSecret] = useState(secret);

  const onSubmit = async ({ createRootCommentForm }) => {
    if (!userInfo) {
      alert('로그인을 먼저해주세요');
    }
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: userInfo?.name,
      secret: isSecret,
      content: createRootCommentForm,
    });
    await postCommentApi({ postType, data: newCommentData });
    setIsSecret(false);
    reset({ createRootCommentForm: '' });
  };

  return (
    <S.FormBox style={{ marginBottom: '12px' }}>
      <form
        id="createRootCommentForm"
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register('createRootCommentForm', {
            required: '내용을 입력해주세요.',
          })}
          placeholder="댓글을 입력하세요."
        />
        <span>{errors?.createRootCommentForm?.message}</span>
        <span>{errors?.extraError?.message}</span>
      </form>
      <span>비밀댓글여부</span>
      <input type="checkbox" checked={isSecret} onChange={() => setIsSecret((prev) => !prev)} />
      <button form="createRootCommentForm" type="submit">
        작성
      </button>
    </S.FormBox>
  );
}
