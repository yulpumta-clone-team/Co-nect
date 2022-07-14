import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { setPostIdOnSubmitData } from 'utils';
import * as S from './style';

const USE_FORM_COMMENT_KEY = 'commentValue';

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  postType: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
  }).isRequired,
  initialText: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  commentInfo: PropTypes.shape({
    id: PropTypes.number,
    parentId: PropTypes.number,
    secret: PropTypes.bool,
  }).isRequired,
  hasCancelButton: PropTypes.bool.isRequired,
  hasDeleteButton: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleClickDeleteButton: PropTypes.func.isRequired,
};

export default function CommentForm({
  postType,
  postId,
  userInfo,
  initialText,
  submitCallback,
  commentInfo,
  hasCancelButton,
  hasDeleteButton,
  handleCancel,
  handleClickDeleteButton,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { id: commentId, parentId, secret } = commentInfo;
  const formId = commentId || 'rootForm';
  const [isSecret, setIsSecret] = useState(secret);
  const onSubmit = useCallback(
    async ({ commentValue }) => {
      if (!userInfo) {
        alert('로그인을 먼저해주세요');
      }
      const newCommentData = setPostIdOnSubmitData(postType, postId, {
        parentId,
        writer: userInfo?.name,
        secret: isSecret,
        content: commentValue,
      });
      await submitCallback(newCommentData, commentId, parentId);
      setValue(USE_FORM_COMMENT_KEY, '');
    },
    [commentId, isSecret, parentId, postId, postType, setValue, submitCallback, userInfo],
  );
  return (
    <S.FormBox style={{ marginBottom: '12px' }}>
      <form
        id={formId}
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register(USE_FORM_COMMENT_KEY, {
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
      <button form={formId} type="submit">
        작성
      </button>
      {hasDeleteButton && (
        <button onClick={() => handleClickDeleteButton(commentId, parentId)}>삭제</button>
      )}
      {hasCancelButton && <button onClick={handleCancel}>취소</button>}
    </S.FormBox>
  );
}
