import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import Image from 'components/Common/Image';
import { parsedNumberToThreeDigits } from 'utils';
import ChatBubbleOvalSvg from 'assets/icons/ChatBubbleOvalSvg';
import CreateReplyCommentForm from '../CommentForm/Create.Reply.CommentForm';
import NestedCommentList from '../CommentList/Nested.CommentList';
import EditRootCommentForm from '../CommentForm/Edit.CommentForm';
import SecretCommentElement from './Secret.CommentElement';
import NestedCommentToggleButton from './NestedCommentToggleButton';
import * as S from '../style';
import CommentLikeSvg from './CommentLikeSvg';

RootCommentElement.propTypes = {
  commentInfo: commentInfoType.isRequired,
  postWriterId: PropTypes.number.isRequired,
};

// 답글보여주기 상태에 따른 컴포넌트 렌더링
export default function RootCommentElement({ commentInfo, postWriterId }) {
  const {
    id: commentId,
    parentId,
    content,
    secret,
    userInfo: writerInfo,
    replies,
    img,
    feelings: likedUserIds,
  } = commentInfo;
  const { id: writerId, image: writerProfileImage, name: writerName } = writerInfo;
  const { createReplyTargetCommentId, targetReplyListId, postType, editTargetCommentId } =
    useCommentsState();
  const { selectEditTargetComment, handleClickDeleteTargetComment } = useCommentsAction();

  const isShowCreateReplyForm = createReplyTargetCommentId !== commentId;
  const isShowReplies = commentId === targetReplyListId;
  const likesCount = likedUserIds.length;
  const isEditTargetComment = commentId === editTargetCommentId;
  const handleClickTargetComment = () => selectEditTargetComment(commentId);

  const handleClickDeleteButton = () => {
    handleClickDeleteTargetComment({ postType, id: commentId });
  };

  return (
    <S.CommentContainer>
      <Image src={writerProfileImage} alt="작성자 프로필 이미지" customStyle={S.UserProfileImage} />
      <S.RootCommentBox>
        <S.PublicCommentBox>
          <S.CommentTitle>
            <h3>{writerName}</h3>
            {/* <span>2022.12.31</span> */}
          </S.CommentTitle>
          <SecretCommentElement
            content={content}
            isSecret={secret}
            postWriterId={postWriterId}
            writerId={writerId}
          />
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
            <CommentLikeSvg commentId={commentId} parentId={parentId} likedUserIds={likedUserIds} />
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
            <NestedCommentList postWriterId={postWriterId} comments={replies} />
            <CreateReplyCommentForm />
          </>
        )}
      </S.RootCommentBox>
    </S.CommentContainer>
  );
}
