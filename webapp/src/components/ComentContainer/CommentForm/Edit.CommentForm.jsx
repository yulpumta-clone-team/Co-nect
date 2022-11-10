import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import useForm from 'hooks/useForm';
import { commentFormValidation } from 'service/etc/comment.validation';
import TextArea from 'components/Common/TextArea';
import CheckInput from 'components/Common/CheckInput';
import Button from 'components/Common/Button';
import * as S from '../style';

EditCommentForm.propTypes = {
  initialText: PropTypes.string.isRequired,
  secret: PropTypes.bool.isRequired,
};

export default function EditCommentForm({ initialText, secret }) {
  const { editCommentSubmitCallback, resetEditTargetCommentId, forceRefetch } = useCommentsAction();

  const handleClickCancel = () => resetEditTargetCommentId();

  const {
    inputValues,
    validateError,
    onChangeHandler,
    onChangeHandlerWithSelect,
    submitHandler,
    satisfyAllValidates,
  } = useForm({
    initialValues: { content: initialText, isSecret: false },
    submitCallback: editCommentSubmitCallback,
    validate: commentFormValidation,
  });

  return (
    <S.FormBox id="editCommentForm" onSubmit={submitHandler}>
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
          onChange={onChangeHandlerWithSelect}
        />
        <Button
          form="editCommentForm"
          type="submit"
          theme="primary"
          customStyle={S.FormSubmitButton}
        >
          입력
        </Button>
        <Button theme="primary" customStyle={S.FormSubmitButton} onClick={handleClickCancel}>
          취소
        </Button>
      </S.FormButtons>
    </S.FormBox>
  );
}
