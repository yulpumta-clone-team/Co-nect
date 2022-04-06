import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Comment from 'components/Comment';
import { CommentLi, CommentUl, RepliesUl } from './style';

function CommentContainer({ postId, comments, dispatchComment }) {
  const [activeReplyId, setActiveReplyId] = useState([]);
  const showReplies = (id) => {
    setActiveReplyId([...new Set([...activeReplyId, id])]);
  };
  const hideReplies = (id) => {
    setActiveReplyId([...activeReplyId].filter((reply) => reply !== id));
  };
  return (
    <CommentUl>
      {comments.map(({ replies, ...comment }) => (
        <CommentLi key={comment.id}>
          <Comment postId={postId} comment={comment} dispatchComment={dispatchComment} />
          {replies?.length !== 0 &&
            (!activeReplyId.includes(comment.id) ? (
              <button onClick={() => showReplies(comment.id)}>더보기</button>
            ) : (
              <button onClick={() => hideReplies(comment.id)}>숨기기</button>
            ))}
          {activeReplyId.includes(comment.id) && (
            <RepliesUl>
              {replies.map((comment) => (
                <CommentLi key={comment.id}>
                  <Comment postId={postId} comment={comment} dispatchComment={dispatchComment} />
                </CommentLi>
              ))}
            </RepliesUl>
          )}
        </CommentLi>
      ))}
    </CommentUl>
  );
}

CommentContainer.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  dispatchComment: PropTypes.object.isRequired,
};

export default memo(CommentContainer);
