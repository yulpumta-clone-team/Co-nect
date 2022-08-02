import React from 'react';
import PropTypes from 'prop-types';
import WithProvider from 'hoc/withProvider';
import CommentProvider, { useCommentsState } from 'contexts/Comment/Comment.Provider';
import RootCommentList from './CommentList/Root.CommentList';
import { CreateRootCommentForm } from './CommentForm/Create.Root.CommentForm';

export default WithProvider({ Provider: CommentProvider, Component: CommentContainer });

CommentContainer.propTypes = {
  postWriter: PropTypes.string.isRequired,
};

function CommentContainer({ postWriter }) {
  const { comments } = useCommentsState();

  return (
    <div>
      <CreateRootCommentForm />
      {!comments && comments.length !== 0 ? (
        <div>댓글이 없어요.</div>
      ) : (
        <RootCommentList postWriter={postWriter} comments={comments} />
      )}
    </div>
  );
}
