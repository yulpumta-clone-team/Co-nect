import React from 'react';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import Button from 'components/Common/Button';
import CheckInput from 'components/Common/CheckInput';
import { commentFormValidation } from 'service/etc/comment.validation';
import TextArea from 'components/Common/TextArea';
import useForm from 'hooks/useForm';
import * as S from '../style';

export default function CreateRootCommentForm() {
  const { createRootCommentSubmitCallback, forceRefetch } = useCommentsAction();

  const {
    inputValues,
    validateError,
    onChangeHandler,
    onChangeHandlerWithSelect,
    submitHandler,
    satisfyAllValidates,
  } = useForm({
    initialValues: { content: '', isSecret: false },
    submitCallback: createRootCommentSubmitCallback,
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
          onChange={onChangeHandlerWithSelect}
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
