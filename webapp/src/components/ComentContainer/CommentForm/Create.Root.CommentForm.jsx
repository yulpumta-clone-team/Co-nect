import React from 'react';
import { setPostIdOnSubmitData } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import Button from 'components/Common/Button';
import CheckInput from 'components/Common/CheckInput';
import { commentFormValidation } from 'service/etc/comment.validation';
import TextArea from 'components/Common/TextArea';
import useForm from 'hooks/useForm';
import * as S from '../style';

export default function CreateRootCommentForm() {
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const notifyDispatch = useToastNotificationAction();

  const { postType, postId, isLoading, apiError } = useCommentsState();
  const { postCommentApi, forceRefetch } = useCommentsAction();

  const submitCallback = async (submitData) => {
    if (!userInfo) {
      notifyNewMessage(notifyDispatch, '로그인을 먼저해주세요', TOAST_TYPE.Warning);
      return;
    }
    const { content, isSecret } = submitData;
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: userInfo?.name,
      secret: isSecret,
      content,
    });
    await postCommentApi({ postType, data: newCommentData });
  };

  const { inputValues, validateError, onChangeHandler, submitHandler, satisfyAllValidates } =
    useForm({
      initialValues: { content: '', isSecret: false },
      submitCallback,
      validate: commentFormValidation,
    });

  return (
    <S.FormBox isNested={false} id="createRootCommentForm" onSubmit={submitHandler}>
      <TextArea
        name="content"
        placeholder="댓글을 입력하세요."
        value={inputValues.content}
        onChange={onChangeHandler}
        isError={!!validateError.isSecret}
        helperText={validateError.isSecret}
      />
      <S.FormButtons>
        <CheckInput
          label="비밀댓글"
          name="isSecret"
          value={inputValues.isSecret}
          onChange={onChangeHandler}
        />
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
