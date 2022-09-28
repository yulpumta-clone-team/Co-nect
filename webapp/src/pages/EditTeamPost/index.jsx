import React from 'react';
import { useParams } from 'react-router-dom';
import teamApi from 'api/team.api';
import WithLoading from 'hoc/WithLoading';
import BackButton from 'components/Common/BackButton';
import UpperButton from 'components/Common/UpperButton';
import * as S from './EditTeamPost.style';
import EditTeamPostDetail from './EditTeamPostDetail';

export default function EditTeamPost() {
  const { teamId: stringTeamId } = useParams();
  const teamId = Number(stringTeamId);
  const EditTeamFormWithLoading = WithLoading({
    Component: EditTeamPostDetail,
    responseDataKey: 'targetTeam',
    axiosInstance: teamApi.GET_TEAM_DETAIL,
    axiosConfig: { id: teamId },
  });

  return (
    <S.Container>
      <BackButton />
      <EditTeamFormWithLoading />
      <UpperButton />
    </S.Container>
  );
}
