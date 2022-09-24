import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setPostIdOnSubmitData } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import Button from 'components/Common/Button';
import CheckInput from 'components/Common/CheckInput';
import * as S from '../style';

export default function CreateRootCommentForm() {
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
  const { postCommentApi, forceRefetch } = useCommentsAction();
  const [isSecret, setIsSecret] = useState(false);

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
    await postCommentApi({ postType, data: newCommentData });
    setIsSecret(false);
    reset({ createRootCommentForm: '' });
  };

  return (
    <S.FormBox>
      <form id="createRootCommentForm" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('createRootCommentForm', {
            required: '내용을 입력해주세요.',
          })}
          placeholder="댓글을 입력하세요."
        />
        <span>{errors?.createRootCommentForm?.message}</span>
        <span>{errors?.extraError?.message}</span>
      </form>
      <S.FormButtons>
        <CheckInput label="비밀댓글" name="isSecret" value onChange={() => {}} />
        <Button
          form="createRootCommentForm"
          type="submit"
          theme="primary"
          customStyle={S.FormSubmitButton}
        >
          입력
        </Button>
      </S.FormButtons>
    </S.FormBox>
  );
}
