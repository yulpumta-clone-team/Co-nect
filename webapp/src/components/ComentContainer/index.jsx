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
  const { commentss, apiState } = useCommentsState();
  const { resetTarget } = useCommentsAction();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [comments, setComments] = useState([]);

  const userInfo = getUserInfo(); // {userId, name, profileImg}

  const loggedInUserName = userInfo?.name;

  const addCommentOnRoot = async (newCommentData) => {
    const { error, isError } = await handleFetcher(commentApi.POST_COMMENT, {
      postType,
      data: newCommentData,
    });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    forceUpdate();
  };

  const addCommentOnNested = async (newCommentData) => {
    const { error, isError } = await handleFetcher(commentApi.POST_REPLY, {
      postType,
      data: newCommentData,
    });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    forceUpdate();
  };

  const handlePostComment = async (newCommentData, commentId) => {
    if (commentId) {
      addCommentOnNested(newCommentData);
    } else {
      addCommentOnRoot(newCommentData);
    }
  };

  const editCommentOnRoot = async (newCommentData, commentId) => {
    const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT, {
      postType,
      id: commentId,
      data: newCommentData,
    });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    forceUpdate();
  };
  const editCommentOnNested = async (newCommentData, commentId) => {
    const { error, isError } = await handleFetcher(commentApi.PATCH_REPLY, {
      postType,
      id: commentId,
      data: newCommentData,
    });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    forceUpdate();
  };

  const handleSubmitEditComment = async (newCommentData, commentId, parentId) => {
    if (parentId) {
      editCommentOnNested(newCommentData, commentId);
    } else {
      editCommentOnRoot(newCommentData, commentId);
    }
  };

  const handleClickDeleteButton = async (id, parentId) => {
    const { error, isError } = await handleFetcher(commentApi.DELETE_COMMENT, { postType, id });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    forceUpdate();
  };

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
        submitCallback={handlePostComment}
        commentInfo={{ id: null, parentId: null, secret: false }}
        hasCancelButton={false}
        hasDeleteButton={false}
        handleCancel={() => {}}
        handleClickDeleteButton={handleClickDeleteButton}
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
          resetTarget={resetTarget}
          handlePostComment={handlePostComment}
          handleSubmitEditComment={handleSubmitEditComment}
          handleClickDeleteButton={handleClickDeleteButton}
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
