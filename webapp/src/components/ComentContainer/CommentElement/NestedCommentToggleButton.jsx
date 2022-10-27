import React from 'react';
import PropTypes from 'prop-types';
import CaretDownFillSvg from 'assets/icons/CaretDownFillSvg';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { parsedNumberToThreeDigits } from 'utils';
import CaretUpFillSvg from 'assets/icons/CaretUpFillSvg';
import CreateReplyCommentForm from '../CommentForm/Create.Reply.CommentForm';
import * as S from '../style';

NestedCommentToggleButton.propTypes = {
  replies: PropTypes.array.isRequired,
  isShowCreateReplyForm: PropTypes.bool.isRequired,
  commentId: PropTypes.number.isRequired,
};

// 답글이 없으면 답글 작성 form을 열고 닫는 토글 버튼
// 답글이 있으면 답글 목록을 접을지 말지 선택하는 토글 버튼(답글 목럭을 열면 답글 작성 form이 답글 목록 맨 하단에 위치함)
export default function NestedCommentToggleButton({ replies, isShowCreateReplyForm, commentId }) {
  const { targetReplyListId } = useCommentsState();
  const {
    showCreateReplyFormOnTargetComment,
    showReplyList,
    resetShowReplyList,
    resetCreateReplyTargetCommentId,
  } = useCommentsAction();
  const isShowReplies = commentId === targetReplyListId;
  const handleClickShowReplyButton = () => {
    showReplyList(commentId);
    showCreateReplyFormOnTargetComment(commentId);
  };
  const handleClickHideReplyButton = () => {
    resetShowReplyList(commentId);
    resetCreateReplyTargetCommentId();
  };
  const handleClickShowCreateForm = () => showCreateReplyFormOnTargetComment(commentId);
  if (replies.length === 0) {
    return (
      <>
        {isShowCreateReplyForm && (
          <S.ReplyButton onClick={handleClickShowCreateForm}>
            <CaretDownFillSvg />
            <span>답글 작성하기</span>
          </S.ReplyButton>
        )}
        {!isShowCreateReplyForm && <CreateReplyCommentForm commentId={commentId} />}
      </>
    );
  }
  return (
    <S.ReplyButton
      onClick={isShowReplies ? handleClickHideReplyButton : handleClickShowReplyButton}
    >
      {isShowReplies ? (
        <>
          <CaretUpFillSvg />
          <span>접기</span>
        </>
      ) : (
        <>
          <CaretDownFillSvg />
          <span>{parsedNumberToThreeDigits(replies.length)}개의 답글 보기</span>
        </>
      )}
    </S.ReplyButton>
  );
}
