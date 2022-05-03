import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useInput from 'hooks/useInput';

function CommentForm({ initialText, submitCallback, commentInfo, hasCancelButton, handleCancel }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [isSecret, setIsSecret] = useState(false);
  console.log('commentInfo :>> ', commentInfo, isSecret);
  const commentValue = watch('commentValue');
  const isTextareaDisabled = commentValue?.length === 0;
  const onSubmit = useCallback(
    async ({ commentValue }) => {
      const response = await submitCallback(commentValue, isSecret);
      console.log('response :>> ', response);
    },
    [isSecret, submitCallback],
  );
  return (
    <div style={{ marginBottom: '12px' }}>
      <form
        id="submit-form"
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register('commentValue', {
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
      <button form="submit-form" type="submit">
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
