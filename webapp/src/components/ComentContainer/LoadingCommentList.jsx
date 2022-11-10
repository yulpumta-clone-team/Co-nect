import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import RootCommentList from './CommentList/Root.CommentList';

HocLoadingCommentList.propTypes = {
  postWriterId: PropTypes.number.isRequired,
};

export default function HocLoadingCommentList({ postWriterId }) {
  const { comments, isLoading, apiError } = useCommentsState();
  const { forceRefetch } = useCommentsAction();

  if (isLoading) return <div>Loading...</div>;

  if (apiError.isError)
    return (
      <div>
        <h1>{apiError.msg}</h1>
        <button onClick={forceRefetch}>refetch</button>
      </div>
    );
  if (!comments && comments.length !== 0) return <div>댓글이 없어요.</div>;
  return <RootCommentList postWriterId={postWriterId} comments={comments} />;
}
