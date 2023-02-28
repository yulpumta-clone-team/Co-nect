import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import HeartFillSvg from 'assets/icons/HeartFillSvg';
import HeartSvg from 'assets/icons/HeartSvg';
import * as S from '../Comment.style';

CommentLikeSvg.propTypes = {
  commentId: PropTypes.number.isRequired,
  parentId: PropTypes.number,
  likedUserIds: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
    }),
  ),
};

export default function CommentLikeSvg({ commentId, parentId, likedUserIds }) {
  const { isLikedUserIdsContainLoggedInUserId, handleClickLikeThumb } = useCommentsAction();

  const handleClickThumbSvg = () => {
    handleClickLikeThumb(likedUserIds, commentId, parentId);
  };
  const isFillHeartSvg = isLikedUserIdsContainLoggedInUserId(likedUserIds);

  const LikeHeartSvg = isFillHeartSvg ? HeartFillSvg : HeartSvg;
  return (
    <S.HeartButton onClick={handleClickThumbSvg}>
      <LikeHeartSvg />
    </S.HeartButton>
  );
}
