import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import * as S from '../style';
import RootCommentElement from '../CommentElement/Root.CommentElement';
import { CreateReplyCommentForm } from '../CommentForm/Create.Reply.CommentForm';
import NestedCommentList from '../CommentList/Nested.CommentList';

HocNestedComment.propTypes = {
  commentInfo: commentInfoType.isRequired,
  postWriter: PropTypes.string.isRequired,
  replies: PropTypes.array,
};

export default function HocNestedComment({ commentInfo, postWriter, replies }) {
  const { id: commentId } = commentInfo;
  const { createReplyTargetCommentId, targetReplyListId } = useCommentsState();
  const { showCreateReplyFormOnTargetComment, showReplyList, resetShowReplyList } =
    useCommentsAction();
  const isShowCreateReplyForm = createReplyTargetCommentId !== commentId;
  const isShowReplies = commentId === targetReplyListId;
  const handleClickShowReplyButton = () => showReplyList(commentId);
  const handleClickHideReplyButton = () => resetShowReplyList(commentId);
  const handleClickShowCreateForm = () => showCreateReplyFormOnTargetComment(commentId);
  return (
    <li>
      <RootCommentElement commentId={commentId} postWriter={postWriter} commentInfo={commentInfo} />
      <S.ReplyButtons>
        {isShowReplies && <button onClick={handleClickHideReplyButton}>답글 가리기</button>}
        {!isShowReplies && <button onClick={handleClickShowReplyButton}>답글 보여주기</button>}
        {isShowCreateReplyForm && (
          <button onClick={handleClickShowCreateForm}>답글 작성하기</button>
        )}
      </S.ReplyButtons>
      {!isShowCreateReplyForm && <CreateReplyCommentForm commentId={commentId} />}
      {replies && replies.length !== 0 && isShowReplies && (
        <NestedCommentList postWriter={postWriter} comments={replies} />
      )}
    </li>
  );
}
