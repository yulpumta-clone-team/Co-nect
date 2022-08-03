import React from 'react';
import PropTypes from 'prop-types';
import WithProvider from 'hoc/withProvider';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import { CreateRootCommentForm } from './CommentForm/Create.Root.CommentForm';
import HocLoadingCommentList from './Hoc/Hoc.LoadingCommentList';

export default WithProvider({ Provider: CommentProvider, Component: CommentContainer });

CommentContainer.propTypes = {
  postWriter: PropTypes.string.isRequired,
};

function CommentContainer({ postWriter }) {
  return (
    <div>
      <CreateRootCommentForm />
      <HocLoadingCommentList postWriter={postWriter} />
    </div>
  );
}
