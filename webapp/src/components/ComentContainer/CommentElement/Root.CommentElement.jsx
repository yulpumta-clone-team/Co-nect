import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import { getUserInfo } from 'service/auth';
import Image from 'components/Common/Image';
import { parsedNumberToThreeDigits } from 'utils';
import CaretDownFillSvg from 'assets/icons/CaretDownFillSvg';
import CaretUpFillSvg from 'assets/icons/CaretUpFillSvg';
import HeartSvg from 'assets/icons/HeartSvg';
import ChatBubbleOvalSvg from 'assets/icons/ChatBubbleOvalSvg';
import CreateReplyCommentForm from '../CommentForm/Create.Reply.CommentForm';
import NestedCommentList from '../CommentList/Nested.CommentList';
import EditRootCommentForm from '../CommentForm/Edit.CommentForm';
import * as S from '../style';
import SecretCommentElement from './Secret.CommentElement';

RootCommentElement.propTypes = {
  commentInfo: commentInfoType.isRequired,
  postWriter: PropTypes.string.isRequired,
  replies: PropTypes.array,
};

// 답글보여주기 상태에 따른 컴포넌트 렌더링
export default function RootCommentElement({ commentInfo, postWriter, replies }) {
  const {
    id: commentId,
    img,
    secret,
    writer: commenWriter,
    feelings: likedUserIds,
    content,
    parentId,
  } = commentInfo;
  const userInfo = getUserInfo(); // {userId, nickname, profileImg}
  const loggedInUserId = userInfo?.userId;
  const loggedInUserNickname = userInfo?.nickname;
  const { createReplyTargetCommentId, targetReplyListId, postType, editTargetCommentId } =
    useCommentsState();
  const {
    isShowSecretComment,
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

  const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserNickname);

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
          {isSecret ? (
            <SecretCommentElement isNested={false} />
          ) : (
            <S.CommentContent>{content}</S.CommentContent>
          )}
        </S.PublicCommentBox>
        {isEditTargetComment && <EditRootCommentForm initialText={content} secret={secret} />}
        <S.CommentInfo>
          <S.SpecificInfo>
            <S.Chat>
              <ChatBubbleOvalSvg />
            </S.Chat>
            <span>{parsedNumberToThreeDigits(replies.length)}</span>
          </S.SpecificInfo>
          <S.SpecificInfo>
            <S.HeartButton isFill={isLikesContainUserId} onClick={handleClickThumbSvg}>
              <HeartSvg />
            </S.HeartButton>
            <span>{parsedNumberToThreeDigits(likesCount)}</span>
          </S.SpecificInfo>
          <S.SpecificInfo>
            {!isEditTargetComment && (
              <S.EditButton onClick={handleClickTargetComment}>댓글수정</S.EditButton>
            )}
          </S.SpecificInfo>
        </S.CommentInfo>
        {replies && replies.length !== 0 && (
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
        )}
        {/* 답글 작성 form이 기본으로 보이는지 여부를 디자이너분께 질문해 놓은 상황 */}
        {/* {isShowCreateReplyForm && (
            <button onClick={handleClickShowCreateForm}>답글 작성하기</button>
          )} */}
        {!isShowCreateReplyForm && <CreateReplyCommentForm commentId={commentId} />}
        {replies && replies.length !== 0 && isShowReplies && (
          <>
            <NestedCommentList postWriter={postWriter} comments={replies} />
            <CreateReplyCommentForm />
          </>
        )}
      </S.RootCommentBox>
    </S.CommentContainer>
  );
}
