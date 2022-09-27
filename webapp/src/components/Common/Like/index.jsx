import React, { useEffect, useState } from 'react';

import BlueHeartIcon from 'assets/icons/blue-heart.svg';
import FullHeartIcon from 'assets/icons/full-heart.svg';

import PropTypes from 'prop-types';

import teamApi from 'api/team.api';
import * as S from './style';

Like.propTypes = {
  id: PropTypes.number.isRequired,
};

export default function Like({ id }) {
  const [like, setLike] = useState(false);
  const [apiError, setApiError] = useState({
    isError: false,
    msg: '',
  });

  const toggleLike = async () => {
    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
    if (like === false) {
      try {
        const { data: responseData } = await teamApi.ADD_TEAM_LIKE({ id });
        console.log('data', responseData);
      } catch (error) {
        console.error(error);
        setApiError({
          isError: true,
          msg: error.message,
        });
      }
    } else {
      try {
        const { data: responseData } = await teamApi.DELETE_TEAM_LIKE({ id });
        console.log('data', responseData);
      } catch (error) {
        console.error(error);
        setApiError({
          isError: true,
          msg: error.message,
        });
      }
    }
  };
  return <S.Heart src={like ? FullHeartIcon : BlueHeartIcon} onClick={toggleLike} />;
}
