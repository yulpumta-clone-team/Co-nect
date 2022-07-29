import React from 'react';
import PropTypes from 'prop-types';
import { getUserInfo } from 'service/auth';
import WithProvider from 'hoc/withProvider';
import CommentProvider, {
  useCommentsAction,
  useCommentsState,
} from 'contexts/Comment/Comment.Provider';
import CommentForm from './CommentForm';
import RootCommentList from './CommentList/Root.CommentList';

export default WithProvider({ Provider: CommentProvider, Component: CommentContainer });

CommentContainer.propTypes = {
  postWriter: PropTypes.string.isRequired,
};

function CommentContainer({ postWriter }) {
  const { comments } = useCommentsState();
  const { resetTarget, postCommentApi } = useCommentsAction();

  const userInfo = getUserInfo(); // {userId, name, profileImg}

  const loggedInUserName = userInfo?.name;

  return (
    <div>
      <CommentForm
        initialText=""
        submitCallback={postCommentApi}
        commentInfo={{ id: null, parentId: null, secret: false }}
        hasCancelButton={false}
        hasDeleteButton={false}
        handleCancel={() => {}}
      />
      {!comments && comments?.length !== 0 ? (
        <div>댓글이 없어요.</div>
      ) : (
        <RootCommentList
          postWriter={postWriter}
          loggedInUserName={loggedInUserName}
          comments={comments}
        />
      )}
    </div>
  );
}
