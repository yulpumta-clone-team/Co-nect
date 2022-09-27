import React from 'react';
import PropTypes from 'prop-types';
import { setPostIdOnSubmitData } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import useForm from 'hooks/useForm';
import { commentFormValidation } from 'service/etc/comment.validation';
import TextArea from 'components/Common/TextArea';
import CheckInput from 'components/Common/CheckInput';
import Button from 'components/Common/Button';
import * as S from '../style';

EditRootCommentForm.propTypes = {
  initialText: PropTypes.string.isRequired,
  secret: PropTypes.bool.isRequired,
};

export default function EditRootCommentForm({ initialText, secret }) {
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const notifyDispatch = useToastNotificationAction();
  const { postType, postId, editTargetCommentId, isLoading, apiError } = useCommentsState();
  const { patchCommentApi, resetEditTargetCommentId, forceRefetch } = useCommentsAction();

  const handleClickCancel = () => resetEditTargetCommentId();

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
    await patchCommentApi({ postType, id: editTargetCommentId, data: newCommentData });
    resetEditTargetCommentId();
  };

  const { inputValues, validateError, onChangeHandler, submitHandler, satisfyAllValidates } =
    useForm({
      initialValues: { content: initialText, isSecret: false },
      submitCallback,
      validate: commentFormValidation,
    });

  return (
    <S.FormBox id="editRootCommentForm" onSubmit={submitHandler}>
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
          form="editRootCommentForm"
          type="submit"
          theme="primary"
          customStyle={S.FormSubmitButton}
        >
          입력
        </Button>
        <Button
          form="editRootCommentForm"
          type="submit"
          theme="primary"
          customStyle={S.FormSubmitButton}
          onClick={handleClickCancel}
        >
          취소
        </Button>
      </S.FormButtons>
    </S.FormBox>
  );
}
