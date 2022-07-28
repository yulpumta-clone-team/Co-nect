import { useMemo, useState } from 'react';

const DEFAULT_TARGET = -1;

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const [apiState, setApiState] = useState({
    isLoading: true,
    isError: false,
    error: null,
  });
  const selectEditTargetComment = (commentId) => {
    setEditTargetCommentId(commentId);
  };

  const resetTarget = () => {
    setEditTargetCommentId(DEFAULT_TARGET);
  };
  const getComments = () => {};
  const postComment = () => {};
  const actions = useMemo(
    () => ({
      selectEditTargetComment,
      resetTarget,
      getComments,
      postComment,
    }),
    [],
  );
  const states = useMemo(
    () => ({ comments, apiState, editTargetCommentId }),
    [apiState, comments, editTargetCommentId],
  );
  return [states, actions];
};

export default useComments;
