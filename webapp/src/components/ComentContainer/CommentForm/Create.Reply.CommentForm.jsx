import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setPostIdOnSubmitData } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import * as S from '../style';

export function CreateReplyCommentForm() {
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const notifyDispatch = useToastNotificationAction();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { postType, postId, isLoading, apiError } = useCommentsState();
  const { postReplyApi, resetCreateReplyTargetCommentId, forceRefetch } = useCommentsAction();
  const [isSecret, setIsSecret] = useState(false);

  const handleClickCancel = () => resetCreateReplyTargetCommentId();

  const onSubmit = async ({ createRootCommentForm }) => {
    if (!userInfo) {
      notifyNewMessage(notifyDispatch, '로그인을 먼저해주세요', TOAST_TYPE.Warning);
      return;
    }
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: userInfo?.name,
      secret: isSecret,
      content: createRootCommentForm,
    });
    await postReplyApi({ postType, data: newCommentData });
    setIsSecret(false);
    reset({ createRootCommentForm: '' });
  };
  return (
    <S.FormBox style={{ marginBottom: '12px' }}>
      <form
        id="createReplyCommentForm"
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register('createReplyCommentForm', {
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
      <button form="createReplyCommentForm" type="submit">
        작성
      </button>
      <button onClick={handleClickCancel}>취소</button>
    </S.FormBox>
  );
}
