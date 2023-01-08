import React, { useState } from 'react';
import PropTypes from 'prop-types';
import teamApi from 'api/team.api';
import useAxios from 'hooks/useAxios';
import HeartSvg from 'assets/icons/HeartSvg';
import HeartFillSvg from 'assets/icons/HeartFillSvg';
import * as S from './style';

Like.propTypes = {
  id: PropTypes.number.isRequired,
  initValue: PropTypes.bool.isRequired,
};

export default function Like({ id, initValue }) {
  const [isActive, setIsActive] = useState(initValue);

  const { notGetExecution: addTeamLike } = useAxios({
    axiosInstance: teamApi.ADD_TEAM_LIKE,
    immediate: false,
  });
  const { notGetExecution: deleteTeamLike } = useAxios({
    axiosInstance: teamApi.DELETE_TEAM_LIKE,
    immediate: false,
  });

  const toggleLike = async () => {
    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    if (isActive) {
      await deleteTeamLike({ newConfig: id });
      setIsActive(false);
    } else {
      await addTeamLike({ newConfig: id });
      setIsActive(true);
    }
  };

  return (
    <S.Heart onClick={toggleLike} isActive={isActive}>
      {isActive ? <HeartFillSvg /> : <HeartSvg />}
    </S.Heart>
  );
}
