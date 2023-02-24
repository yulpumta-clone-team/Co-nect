import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import Spinner from 'components/Common/Loader/Spinner';
import Button from 'components/Common/Button';
import RootCommentList from './CommentList/Root.CommentList';
import * as S from './Comment.style';

HocLoadingCommentList.propTypes = {
  postWriterId: PropTypes.string.isRequired,
};

export default function HocLoadingCommentList({ postWriterId }) {
  const { comments, isLoading, apiError } = useCommentsState();
  const { forceRefetch } = useCommentsAction();

  if (isLoading)
    return (
      <S.HocContainer>
        <Spinner withLogo />
      </S.HocContainer>
    );

  if (apiError)
    return (
      <S.HocContainer>
        <h1>{apiError.message}</h1>
        <Button theme="primary" onClick={forceRefetch} customStyle={S.RefetchButton}>
          재요청하기
        </Button>
      </S.HocContainer>
    );
  if (!comments && comments.length !== 0) return <div>댓글이 없어요.</div>;
  return <RootCommentList postWriterId={postWriterId} comments={comments} />;
}
