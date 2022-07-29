import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { setPostIdOnSubmitData } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import * as S from './style';

const USE_FORM_COMMENT_KEY = 'commentValue';

CommentForm.propTypes = {
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
};

export default function CommentForm({
  initialText,
  submitCallback,
  commentInfo,
  hasCancelButton,
  hasDeleteButton,
  handleCancel,
}) {
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
  const { deleteCommentApi } = useCommentsAction();
  const { id: commentId, parentId, secret } = commentInfo;
  const formId = commentId || 'rootForm';
  const [isSecret, setIsSecret] = useState(secret);

  const handleClickDeleteButton = () => {
    deleteCommentApi({ postType, id: commentId });
  };

  const onSubmit = async ({ commentValue }) => {
    if (!userInfo) {
      alert('로그인을 먼저해주세요');
    }
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      parentId,
      writer: userInfo?.name,
      secret: isSecret,
      content: commentValue,
    });
    await submitCallback({ postType, data: newCommentData, id: commentId });
    setValue(USE_FORM_COMMENT_KEY, '');
    setIsSecret(false);
  };
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
      {hasDeleteButton && <button onClick={handleClickDeleteButton}>삭제</button>}
      {hasCancelButton && <button onClick={handleCancel}>취소</button>}
    </S.FormBox>
  );
}
