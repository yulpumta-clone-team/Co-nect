import { useCallback, useState } from 'react';

const useOrder = () => {
  const [likeOrder, setLikeOrder] = useState(false);
  const handleSort = (a, b) => {
    return b.like_cnt - a.like_cnt;
  };
  const handleOrder = useCallback(
    (list, cb) => {
      if (likeOrder) {
        const newList = [...list].sort(handleSort);
        return newList;
      }
      return cb(list);
    },
    [likeOrder],
  );
  return [likeOrder, setLikeOrder, handleOrder];
};

export default useOrder;
