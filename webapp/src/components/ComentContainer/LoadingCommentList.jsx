import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import Button from 'components/Common/Button';
import RootCommentList from './CommentList/Root.CommentList';
import * as S from './style';

HocLoadingCommentList.propTypes = {
  postWriterId: PropTypes.number.isRequired,
};

export default function HocLoadingCommentList({ postWriterId }) {
  const { comments, isLoading, apiError } = useCommentsState();
  const { forceRefetch } = useCommentsAction();

  if (isLoading) return <div>Loading...</div>;

  if (apiError.isError)
    return (
      <S.ErrorContainer>
        <h4>{apiError.msg}</h4>
        <Button theme="primary" onClick={forceRefetch}>
          다시 요청해주세요.
        </Button>
      </S.ErrorContainer>
    );
  if (!comments && comments.length !== 0) return <div>댓글이 없어요.</div>;
  return <RootCommentList postWriterId={postWriterId} comments={comments} />;
}
