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
import SecretCommentElement from './Secret.CommentElement';
import * as S from '../style';
import NestedCommentToggleButton from './NestedCommentToggleButton';

RootCommentElement.propTypes = {
  commentInfo: commentInfoType.isRequired,
  postWriter: PropTypes.string.isRequired,
  replies: PropTypes.array,
};

// 답글보여주기 상태에 따른 컴포넌트 렌더링
export default function RootCommentElement({ commentInfo, postWriter, replies }) {
  const {
    id: commentId,
    parentId,
    content,
    secret,
    userInfo: writerInfo,
    img,
    writer: commenWriter,
    feelings: likedUserIds,
  } = commentInfo;
  const userInfo = getUserInfo(); // {userId, nickname, profileImg}
  const { id: writerId, image: writerProfileImage, name: writerName } = writerInfo;
  const loggedInUserId = userInfo?.userId;
  const loggedInUserNickname = userInfo?.nickname;
  const { createReplyTargetCommentId, targetReplyListId, postType, editTargetCommentId } =
    useCommentsState();
  const {
    isShowSecretComment,
    selectEditTargetComment,
    handleClickLikeThumb,
    isLikesContainUserId,
    handleClickDeleteTargetComment,
  } = useCommentsAction();

  const isShowCreateReplyForm = createReplyTargetCommentId !== commentId;
  const isShowReplies = commentId === targetReplyListId;
  const likesCount = likedUserIds.length;
  const isEditTargetComment = commentId === editTargetCommentId;
  const handleClickTargetComment = () => selectEditTargetComment(commentId);

  const handleClickThumbSvg = () => {
    const idObj = { commentId, loggedInUserId, parentId };
    handleClickLikeThumb(isLikesContainUserId, postType, idObj);
  };

  const handleClickDeleteButton = () => {
    handleClickDeleteTargetComment({ postType, id: commentId });
  };

  const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserNickname);

  return (
    <S.CommentContainer>
      <Image src={writerProfileImage} alt="작성자 프로필 이미지" customStyle={S.UserProfileImage} />
      <S.RootCommentBox>
        <S.PublicCommentBox>
          <S.CommentTitle>
            <h3>{writerName}</h3>
            {/* <span>2022.12.31</span> */}
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
          {!isEditTargetComment && (
            <S.SpecificInfo>
              <S.EditButton onClick={handleClickTargetComment}>댓글수정</S.EditButton>
              <span>/</span>
              <S.EditButton onClick={handleClickDeleteButton}>삭제하기</S.EditButton>
            </S.SpecificInfo>
          )}
        </S.CommentInfo>
        <NestedCommentToggleButton
          replies={replies}
          isShowCreateReplyForm={isShowCreateReplyForm}
          commentId={commentId}
        />
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
