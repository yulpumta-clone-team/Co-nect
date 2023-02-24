import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import HeartFillSvg from 'assets/icons/HeartFillSvg';
import HeartSvg from 'assets/icons/HeartSvg';
import * as S from '../Comment.style';

CommentLikeSvg.propTypes = {
  commentId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  likedUserIds: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }),
  ),
};

export default function CommentLikeSvg({ commentId, parentId, likedUserIds }) {
  const { isLikedUserIdsContainLoggnedInUserId, handleClickLikeThumb } = useCommentsAction();

  const handleClickThumbSvg = () => {
    handleClickLikeThumb(likedUserIds, commentId, parentId);
  };
  const isFillHeartSvg = isLikedUserIdsContainLoggnedInUserId(likedUserIds);

  const LikeHeartSvg = isFillHeartSvg ? HeartFillSvg : HeartSvg;
  return (
    <S.HeartButton onClick={handleClickThumbSvg}>
      <LikeHeartSvg />
    </S.HeartButton>
  );
}
