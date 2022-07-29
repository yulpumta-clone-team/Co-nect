import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { handleFetcher } from 'utils';
import commentApi from 'api/comment';
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
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

function CommentContainer({ postType, postWriter, postId }) {
  const { commentss } = useCommentsState();
  const { resetTarget, postCommentApi } = useCommentsAction();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [comments, setComments] = useState([]);

  const userInfo = getUserInfo(); // {userId, name, profileImg}

  const loggedInUserName = userInfo?.name;

  const addLike = async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT_LIKE, {
      postType,
      id,
    });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, addLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => addLikeToComment({ prevComments, id, loggedInUserId }));
    }
  };

  const removeLike = async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT_UN_LIKE, {
      postType,
      id,
    });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, removeLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => removeLikeToComment({ prevComments, id, loggedInUserId }));
    }
  };

  const handleClickLikeThumb = async (id, loggedInUserId, isLikesContainUserId, parentId) => {
    const idObj = { id, loggedInUserId, parentId };
    if (isLikesContainUserId) {
      removeLike(postType, idObj);
    } else {
      addLike(postType, idObj);
    }
  };

  const fetchComments = async () => {
    const {
      error,
      isError,
      value: comments,
    } = await handleFetcher(commentApi.GET_COMMENT, { postType, postId });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    setComments(comments);
    resetTarget();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <CommentForm
        postType={postType}
        postId={postId}
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
          isReplies={false}
          postType={postType}
          postWriter={postWriter}
          loggedInUserName={loggedInUserName}
          comments={comments}
          handleClickLikeThumb={handleClickLikeThumb}
        />
      )}
    </div>
  );
}

const deepClone = (originalObject) => JSON.parse(JSON.stringify(originalObject));

const findParentAndDoCallback = (parents, parentId, callback, callbackParams) => {
  return parents.map((comment) => {
    if (comment.id === parentId) {
      const clone = deepClone(comment);
      clone.replies = callback({ prevComments: clone.replies, ...callbackParams });
      return clone;
    }
    return comment;
  });
};

const addLikeToComment = ({ prevComments, id, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === id) {
      const clone = deepClone(comment);
      clone.feeling.push(loggedInUserId);
      return clone;
    }
    return comment;
  });
};

const removeLikeToComment = ({ prevComments, id, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === id) {
      const clone = deepClone(comment);
      clone.feeling = [...clone.feeling].filter((userId) => userId !== loggedInUserId);
      return clone;
    }
    return comment;
  });
};
