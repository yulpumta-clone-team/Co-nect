import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import * as S from '../style';
import NestedCommentElement from '../CommentElement/Nested.CommentElement';

const DEFAULT_TARGET = -1;

NestedCommentList.propTypes = {
  loggedInUserName: PropTypes.string,
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function NestedCommentList({ postWriter, loggedInUserName, comments }) {
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [replyFormCommentId, setReplyFormCommentId] = useState(DEFAULT_TARGET);

  const handleShowReplies = useCallback(() => {
    setIsShowReplies((prev) => !prev);
  }, []);

  const checkSecretComment = useCallback((postWriterName, commentWriterName, loggedInUserName) => {
    // true: 가리기 , false: 보여주기
    if (!loggedInUserName) {
      return true;
    }
    const isSameCommentWriter = () => postWriterName === loggedInUserName;
    const isSamePostWriter = () => commentWriterName === loggedInUserName;
    if (isSameCommentWriter() || isSamePostWriter()) {
      return false;
    }

    return true;
  }, []);

  const isShowSecretComment = useCallback(
    (secret, postWriterName, commentWriterName, loggedInUserName) => {
      // secret ? 가리기 : 보여주기
      if (secret) {
        const isShow = checkSecretComment(postWriterName, commentWriterName, loggedInUserName);
        return isShow;
      }
      return false;
    },
    [checkSecretComment],
  );
  return (
    <S.ListBox>
      {comments &&
        comments.length !== 0 &&
        comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
          const { secret, writer: commenWriter, parentId } = commentInfo;
          const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
          return (
            <li key={id}>
              <NestedCommentElement
                commentId={id}
                isSecret={isSecret}
                postWriter={postWriter}
                commentInfo={commentInfo}
              />
            </li>
          );
        })}
    </S.ListBox>
  );
}
