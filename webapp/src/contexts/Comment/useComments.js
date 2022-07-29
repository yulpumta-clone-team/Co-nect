import commentApi from 'api/comment';
import useAxios from 'hooks/useAxios';
import { useMemo, useState } from 'react';

const DEFAULT_TARGET = -1;

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const [postCommentState, postCommentApi] = useAxios({
    axiosInstance: commentApi.POST_COMMENT,
    immediate: false,
  });

  const [postReplyState, postReplyApi] = useAxios({
    axiosInstance: commentApi.POST_COMMENT,
    immediate: false,
  });

  const [patchCommentState, patchCommentApi] = useAxios({
    axiosInstance: commentApi.PATCH_COMMENT,
    immediate: false,
  });

  const [pathCommentState, pathReplyApi] = useAxios({
    axiosInstance: commentApi.PATCH_REPLY,
    immediate: false,
  });

  const selectEditTargetComment = (commentId) => {
    setEditTargetCommentId(commentId);
  };

  const resetTarget = () => {
    setEditTargetCommentId(DEFAULT_TARGET);
  };
  const actions = useMemo(
    () => ({
      selectEditTargetComment,
      resetTarget,
      postCommentApi,
      postReplyApi,
      patchCommentApi,
      pathReplyApi,
    }),
    [patchCommentApi, pathReplyApi, postCommentApi, postReplyApi],
  );
  const states = useMemo(
    () => ({ comments, editTargetCommentId, postCommentState, postReplyState }),
    [, comments, editTargetCommentId, postCommentState, postReplyApi],
  );
  return [states, actions];
};

export default useComments;
