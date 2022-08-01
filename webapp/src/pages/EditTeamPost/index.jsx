import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import teamApi from 'api/team';
import WithLoading from 'hoc/WithLoading';
import * as S from './style';
import EditTeamForm from './EditTeamForm';

export default function EditTeamPost() {
  const { teamId: stringTeamId } = useParams();
  const teamId = Number(stringTeamId);
  const navigate = useNavigate();

  const onClickback = () => {
    navigate(-1);
  };

  const EditTeamFormWithLoading = WithLoading({
    Component: EditTeamForm,
    responseDataKey: 'targetTeam',
    axiosInstance: teamApi.GET_TEAM_DETAIL,
    axiosConfig: { id: teamId },
  });

  return (
    <S.Container>
      <button onClick={onClickback}>back</button>
      <br />
      <EditTeamFormWithLoading onClickback={onClickback} />
    </S.Container>
  );
}
