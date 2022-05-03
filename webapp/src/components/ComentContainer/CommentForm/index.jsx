import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { setPostIdOnSubmitData } from 'utils';
import { getUserCookie } from 'utils/cookie';

const USE_FORM_COMMENT_KEY = 'commentValue';

function CommentForm({
  postType,
  postId,
  initialText,
  submitCallback,
  commentInfo,
  hasCancelButton,
  handleCancel,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { id: commentId } = commentInfo;
  const formId = commentId || 'rootForm';
  const userInfo = getUserCookie(); // {name, img, id}
  const [isSecret, setIsSecret] = useState(false);
  const commentValue = watch(USE_FORM_COMMENT_KEY);
  const isTextareaDisabled = commentValue?.length === 0;
  const onSubmit = useCallback(
    async ({ commentValue }) => {
      if (!userInfo) {
        alert('로그인을 먼저해주세요');
      }
      const newCommentData = setPostIdOnSubmitData(postType, {
        ...commentInfo,
        postId,
        writer: userInfo?.name,
        secret: isSecret,
        content: commentValue,
      });
      console.log('newCommentData', newCommentData);
      await submitCallback(newCommentData);
      setValue(USE_FORM_COMMENT_KEY, '');
    },
    [commentInfo, isSecret, postId, postType, setValue, submitCallback, userInfo],
  );
  return (
    <div style={{ marginBottom: '12px' }}>
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
      {hasCancelButton && (
        <button disabled={isTextareaDisabled} onClick={handleCancel}>
          취소
        </button>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  postType: PropTypes.string.isRequired,
  initialText: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  commentInfo: PropTypes.shape({
    id: PropTypes.number,
    parentId: PropTypes.number,
  }).isRequired,
  hasCancelButton: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default memo(CommentForm);
