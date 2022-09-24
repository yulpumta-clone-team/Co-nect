import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import { getUserInfo } from 'service/auth';
import Image from 'components/Common/Image';
import { parsedNumberToThreeDigits } from 'utils';
import CreateReplyCommentForm from '../CommentForm/Create.Reply.CommentForm';
import NestedCommentList from '../CommentList/Nested.CommentList';
import EditRootCommentForm from '../CommentForm/Edit.CommentForm';
import * as S from '../style';

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
            <button>
              <S.RecycleBinSvg />
            </button>
          </S.CommentTitle>
          <S.CommentContent>{content}</S.CommentContent>
        </S.PublicCommentBox>
        {isEditTargetComment && (
          <EditRootCommentForm initialText={content} secret={secret} commentId={commentId} />
        )}
        <S.CommentInfo>
          <S.SpecificInfo>
            <S.ChatSvg />
            <span>{parsedNumberToThreeDigits(replies.length)}</span>
          </S.SpecificInfo>
          <S.SpecificInfo>
            <S.HeartSvg isFill={isLikesContainUserId} onClick={handleClickThumbSvg} />
            <span>{parsedNumberToThreeDigits(likesCount)}</span>
          </S.SpecificInfo>
          <S.SpecificInfo>
            {!isEditTargetComment && (
              <S.EditButton onClick={handleClickTargetComment}>댓글수정</S.EditButton>
            )}
          </S.SpecificInfo>
        </S.CommentInfo>
        {replies && replies.length !== 0 && (
          <S.ReplyButton>
            {isShowReplies && (
              <button onClick={handleClickHideReplyButton}>
                <S.PolygonUpSvg />
                <span>접기</span>
              </button>
            )}
            {!isShowReplies && (
              <button onClick={handleClickShowReplyButton}>
                <S.PolygonDownSvg />
                <span>{parsedNumberToThreeDigits(replies.length)}개의 답글 보기</span>
              </button>
            )}
          </S.ReplyButton>
        )}
        {/* 답글 작성 form이 기본으로 보이는지 여부를 디자이너분께 질문해 놓은 상황 */}
        {/* {isShowCreateReplyForm && (
            <button onClick={handleClickShowCreateForm}>답글 작성하기</button>
          )} */}
        {!isShowCreateReplyForm && <CreateReplyCommentForm commentId={commentId} />}
        {replies && replies.length !== 0 && isShowReplies && (
          <NestedCommentList postWriter={postWriter} comments={replies} />
        )}
        <CreateReplyCommentForm />
      </S.RootCommentBox>
    </S.CommentContainer>
  );
}
