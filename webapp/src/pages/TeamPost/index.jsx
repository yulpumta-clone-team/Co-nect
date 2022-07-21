import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import teamApi from 'api/team';
import WithLoading from 'hoc/WithLoading';
import TeamPostDetail from './TeamPostDetail';

export default function TeamPost() {
  const { teamId: stringTeamId } = useParams();
  const teamId = Number(stringTeamId);
  const navigate = useNavigate();

  const onClickback = () => {
    navigate(-1);
  };

  const UserPostDetailWithLoading = WithLoading({
    Component: TeamPostDetail,
    responseDataKey: 'targetTeam',
    axiosInstance: teamApi.GET_TEAM_DETAIL,
    axiosConfig: { id: teamId },
  });

  return (
    <div>
      <button onClick={onClickback}>back</button>
      <UserPostDetailWithLoading />
    </div>
  );
}
