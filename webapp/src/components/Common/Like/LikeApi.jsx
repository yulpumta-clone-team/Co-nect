import React, { useState } from 'react';

import PropTypes from 'prop-types';

import teamApi from 'api/team.api';
import useAxios from 'hooks/useAxios';
import Like from './Like';

LikeApi.propTypes = {
  id: PropTypes.number.isRequired,
};

function LikeApi({ id }) {
  const [like, setLike] = useState(false);

  const [, addteamlike] = useAxios({
    axiosInstance: teamApi.ADD_TEAM_LIKE,
    immediate: false,
  });
  const [, deleteteamlike] = useAxios({
    axiosInstance: teamApi.DELETE_TEAM_LIKE,
    immediate: false,
  });

  const toggleLike = async () => {
    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
    if (like === false) {
      await addteamlike({ id });
    } else {
      await deleteteamlike({ id });
    }
  };

  return <Like like={like} toggleLike={toggleLike} />;
}

export default LikeApi;
