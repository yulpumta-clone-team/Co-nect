import React from 'react';
import PropTypes from 'prop-types';
import WithProvider from 'hoc/withProvider';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import CreateRootCommentForm from './CommentForm/Create.Root.CommentForm';
import HocLoadingCommentList from './LoadingCommentList';
import * as S from './style';

export default WithProvider({ Providers: [CommentProvider], Component: CommentContainer });

CommentContainer.propTypes = {
  postWriter: PropTypes.string.isRequired,
};

function CommentContainer({ postWriter }) {
  return (
    <S.Container>
      <HocLoadingCommentList postWriter={postWriter} />
      <CreateRootCommentForm />
    </S.Container>
  );
}
