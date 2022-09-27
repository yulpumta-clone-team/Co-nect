import React, { useState } from 'react';

import BlueHeartIcon from 'assets/icons/blue-heart.svg';
import FullHeartIcon from 'assets/icons/full-heart.svg';

import PropTypes from 'prop-types';

import teamApi from 'api/team.api';
import useAxios from 'hooks/useAxios';
import * as S from './style';

Like.propTypes = {
  id: PropTypes.number.isRequired,
};

export default function Like({ id }) {
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
  return <S.Heart src={like ? FullHeartIcon : BlueHeartIcon} onClick={toggleLike} />;
}
