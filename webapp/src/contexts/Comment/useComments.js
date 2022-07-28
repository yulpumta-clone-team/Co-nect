import { useMemo, useState } from 'react';

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [apiState, setApiState] = useState({
    isLoading: true,
    isError: false,
    error: null,
  });
  const getComments = () => {};
  const postComment = () => {};
  const actions = useMemo(
    () => ({
      getComments,
      postComment,
    }),
    [],
  );
  const states = useMemo(() => [comments, apiState], [apiState, comments]);
  return [states, actions];
};

export default useComments;
