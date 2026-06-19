import React from 'react';
import { useParams } from 'react-router-dom';
import teamApi from 'api/team.api';
import WithLoading from 'hoc/WithLoading';
import BackButton from 'components/Common/BackButton';
import TeamPostDetail from './TeamPostDetail';
import * as S from './TeamPost.style';

export default function TeamPost() {
  const { teamId: stringTeamId } = useParams();
  const teamId = Number(stringTeamId);

  const TeamPostDetailWithLoading = WithLoading({
    Component: TeamPostDetail,
    responseDataKey: 'targetTeam',
    axiosInstance: teamApi.GET_TEAM_DETAIL,
    axiosConfig: { id: teamId },
  });

  return (
    <S.Container>
      <BackButton top="100px" />
      <TeamPostDetailWithLoading />
    </S.Container>
  );
}
