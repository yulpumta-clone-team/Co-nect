import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import { getUserInfo } from 'service/auth';
import * as S from '../style';
import { CreateReplyCommentForm } from '../CommentForm/Create.Reply.CommentForm';
import NestedCommentList from '../CommentList/Nested.CommentList';
import { EditRootCommentForm } from '../CommentForm/Edit.CommentForm';

HocNestedComment.propTypes = {
  commentInfo: commentInfoType.isRequired,
  postWriter: PropTypes.string.isRequired,
  replies: PropTypes.array,
};

// 답글보여주기 상태에 따른 컴포넌트 렌더링
export default function HocNestedComment({ commentInfo, postWriter, replies }) {
  const {
    id: commentId,
    img,
    secret,
    writer: commenWriter,
    feeling: likedUserIds,
    content,
    parentId,
  } = commentInfo;
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const loggedInUserId = userInfo?.userId;
  const { createReplyTargetCommentId, targetReplyListId, postType, editTargetCommentId } =
    useCommentsState();
  const {
    showCreateReplyFormOnTargetComment,
    showReplyList,
    resetShowReplyList,
    selectEditTargetComment,
    handleClickLikeThumb,
    isLikesContainUserId,
  } = useCommentsAction();
  const isShowCreateReplyForm = createReplyTargetCommentId !== commentId;
  const isShowReplies = commentId === targetReplyListId;
  const likesCount = likedUserIds.length;
  const isEditTargetComment = commentId === editTargetCommentId;
  const handleClickShowReplyButton = () => showReplyList(commentId);
  const handleClickHideReplyButton = () => resetShowReplyList(commentId);
  const handleClickShowCreateForm = () => showCreateReplyFormOnTargetComment(commentId);
  const handleClickTargetComment = () => selectEditTargetComment(commentId);

  const handleClickThumbSvg = () => {
    const idObj = { commentId, loggedInUserId, parentId };
    handleClickLikeThumb(isLikesContainUserId, postType, idObj);
  };
  return (
    <S.CommentBox>
      <S.RootCommentBox>
        <S.PublicCommentBox style={{ display: 'flex' }}>
          <S.UserInfo>
            <img src={img} alt="profile" />
            <h3>{commenWriter}</h3>
          </S.UserInfo>
          {!isEditTargetComment && (
            <S.ContentInfo>
              <span>{content}</span>
              <button onClick={handleClickTargetComment}>수정</button>
            </S.ContentInfo>
          )}
          <S.LikeInfo>
            <S.ThumbSVG isFill={isLikesContainUserId} onClick={handleClickThumbSvg}>
              👍
            </S.ThumbSVG>
            <span>: {likesCount}</span>
          </S.LikeInfo>
        </S.PublicCommentBox>
        {isEditTargetComment && (
          <EditRootCommentForm initialText={content} secret={secret} commentId={commentId} />
        )}
      </S.RootCommentBox>
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
    </S.CommentBox>
  );
}
