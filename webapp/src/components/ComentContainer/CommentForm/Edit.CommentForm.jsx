import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { setPostIdOnSubmitData } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';

EditRootCommentForm.propTypes = {
  initialText: PropTypes.string.isRequired,
  secret: PropTypes.bool.isRequired,
};

export function EditRootCommentForm({ initialText, secret }) {
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { postType, postId, editTargetCommentId, isLoading, apiError } = useCommentsState();
  const { patchCommentApi, resetEditTargetCommentId, forceRefetch } = useCommentsAction();
  const [isSecret, setIsSecret] = useState(secret);

  const handleClickCancel = () => resetEditTargetCommentId();

  const onSubmit = async ({ editRootCommentForm }) => {
    if (!userInfo) {
      alert('로그인을 먼저해주세요');
    }
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: userInfo?.name,
      secret: isSecret,
      content: editRootCommentForm,
    });
    await patchCommentApi({ postType, id: editTargetCommentId, data: newCommentData });
    setIsSecret(false);
    reset({ editRootCommentForm: '' });
    resetEditTargetCommentId();
  };
  return (
    <S.FormBox style={{ marginBottom: '12px' }}>
      <form
        id="editRootCommentForm"
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register('editRootCommentForm', {
            required: '내용을 입력해주세요.',
          })}
          defaultValue={initialText}
          placeholder="댓글을 입력하세요."
        />
        <span>{errors?.commentValue?.message}</span>
        <span>{errors?.extraError?.message}</span>
      </form>
      <span>비밀댓글여부</span>
      <input type="checkbox" checked={isSecret} onChange={() => setIsSecret((prev) => !prev)} />
      <button form="editRootCommentForm" type="submit">
        작성
      </button>
      <button onClick={handleClickCancel}>취소</button>
    </S.FormBox>
  );
}
