import React, { useState } from 'react';

import PropTypes from 'prop-types';

import teamApi from 'api/team.api';
import useAxios from 'hooks/useAxios';
import userApi from 'api/user.api';
import Like from './Like';

LikeApi.propTypes = {
  id: PropTypes.number.isRequired,
  isUser: PropTypes.bool.isRequired,
};

function LikeApi({ id, isUser }) {
  const [like, setLike] = useState(false);

  const [, addteamlike] = useAxios({
    axiosInstance: teamApi.ADD_TEAM_LIKE,
    immediate: false,
  });
  const [, deleteteamlike] = useAxios({
    axiosInstance: teamApi.DELETE_TEAM_LIKE,
    immediate: false,
  });
  const [, adduserlike] = useAxios({
    axiosInstance: userApi.ADD_USER_LIKE,
    immediate: false,
  });
  const [, deleteuserlike] = useAxios({
    axiosInstance: userApi.DELETE_USER_LIKE,
    immediate: false,
  });

  const teamLike = async () => {
    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
    if (like === false) {
      await addteamlike({ id });
    } else {
      await deleteteamlike({ id });
    }
  };
  const userLike = async () => {
    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
    if (like === false) {
      await adduserlike({ id });
    } else {
      await deleteuserlike({ id });
    }
  };

  return <Like like={like} toggleLike={isUser ? userLike : teamLike} />;
}

export default LikeApi;
