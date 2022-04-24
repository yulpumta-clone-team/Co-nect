/* eslint-disable react/require-default-props */
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { setDefaultProfileImage } from 'utils';
import useInput from 'hooks/useInput';
import { Buttons, Container, EditForm, Image, Info } from './style';

function Comment({
  id,
  postId,
  commentInfo,
  targetCommentId,
  setTargetCommentId,
  handleSubmitEditComment,
  handleClickDeleteButton,
  handleChangeToSecret,
}) {
  const { img, secret, writer, feeling, content, parentId, replies } = commentInfo;
  // console.log(id, img, postId, secret, writer, feeling, content, parentId, replies);
  const feelingCount = feeling.length;
  const isTargetEditCommnt = id === targetCommentId;
  const [editContent, onEditContentChange] = useInput(content);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newCommentData = {
        writer,
        parentId,
        secret,
        content: editContent,
      };
      handleSubmitEditComment(newCommentData);
    },
    [editContent, handleSubmitEditComment, parentId, secret, writer],
  );

  const checkEditForm = () =>
    isTargetEditCommnt ? (
      <EditForm onSubmit={handleSubmit}>
        <input type="text" value={editContent} onChange={onEditContentChange} />
        <button>수정완료</button>
      </EditForm>
    ) : (
      <Info>
        <span>{content}</span>
      </Info>
    );

  return (
    <Container>
      {secret ? (
        <div>비밀댓글입니다.</div>
      ) : (
        <>
          <Image>
            <img
              style={{ width: '50px', heigth: '50px' }}
              src={setDefaultProfileImage(img)}
              alt="profile"
            />
            <h3>{writer}</h3>
          </Image>
          {checkEditForm()}
          <span>좋아요수: {feelingCount}</span>
          <Buttons>
            <button onClick={() => setTargetCommentId(id)}>수정</button>
            <button onClick={() => handleClickDeleteButton(id)}>삭제</button>
            <button onClick={() => handleChangeToSecret(id)}>비공개로 전환</button>
          </Buttons>
        </>
      )}
    </Container>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  commentInfo: PropTypes.shape({
    img: PropTypes.string.isRequired,
    secret: PropTypes.bool.isRequired,
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    feeling: PropTypes.array.isRequired,
    replies: PropTypes.array.isRequired,
    parentId: PropTypes.number,
  }),
  targetCommentId: PropTypes.number.isRequired,
  setTargetCommentId: PropTypes.func.isRequired,
  handleSubmitEditComment: PropTypes.func.isRequired,
  handleClickDeleteButton: PropTypes.func.isRequired,
  handleChangeToSecret: PropTypes.func.isRequired,
};

export default memo(Comment);
