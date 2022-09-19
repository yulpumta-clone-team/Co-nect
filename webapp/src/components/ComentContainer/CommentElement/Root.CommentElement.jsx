import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import { getUserInfo } from 'service/auth';
import Image from 'components/Common/Image';
import { parsedNumberToThreeDigits } from 'utils';
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
    <S.CommentContainer>
      <Image src={img} alt="유저 프로필" customStyle={S.UserProfileImage} />
      <S.RootCommentBox>
        <S.PublicCommentBox>
          <S.CommentTitle>
            <h3>{commenWriter}</h3>
            <span>2022.12.31</span>
          </S.CommentTitle>
          <S.CommentContent>{content}</S.CommentContent>
        </S.PublicCommentBox>
        {isEditTargetComment && (
          <EditRootCommentForm initialText={content} secret={secret} commentId={commentId} />
        )}
        <S.CommentInfo>
          <S.SpecificInfo>
            <S.ThumbSVG isFill={isLikesContainUserId} onClick={handleClickThumbSvg} />
            <span>{parsedNumberToThreeDigits(likesCount)}</span>
          </S.SpecificInfo>
          <S.SpecificInfo>
            <S.ThumbSVG isFill={isLikesContainUserId} onClick={handleClickThumbSvg} />
            <span>{parsedNumberToThreeDigits(likesCount)}</span>
          </S.SpecificInfo>
          {!isEditTargetComment && <button onClick={handleClickTargetComment}>댓글수정</button>}
        </S.CommentInfo>
        <S.ReplyButtons>
          {isShowReplies && <button onClick={handleClickHideReplyButton}>접기</button>}
          {!isShowReplies && (
            <button onClick={handleClickShowReplyButton}>
              {parsedNumberToThreeDigits(replies.length)}개의 답글 보기
            </button>
          )}
          {isShowCreateReplyForm && (
            <button onClick={handleClickShowCreateForm}>답글 작성하기</button>
          )}
        </S.ReplyButtons>
        {!isShowCreateReplyForm && <CreateReplyCommentForm commentId={commentId} />}
        {replies && replies.length !== 0 && isShowReplies && (
          <NestedCommentList postWriter={postWriter} comments={replies} />
        )}
      </S.RootCommentBox>
    </S.CommentContainer>
  );
}
