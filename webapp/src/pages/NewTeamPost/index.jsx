import React from 'react';
import teamApi from 'api/team.api';
import WithLoading from 'hoc/WithLoading';
import BackButton from 'components/Common/BackButton';
import { getUserInfo } from 'service/auth';
import UpperButton from 'components/Common/UpperButton';
import * as S from './NewTeamPost.style';

export default function NewTeamPost() {
  const userInfo = getUserInfo(); // {id, name, profileImg}
  const NewTeamPostDetailWithLoading = WithLoading({
    Component: NewTeamPostDetail,
    responseDataKey: 'targetNewTeamPost',
    axiosInstance: teamApi.POST_TEAM_POST,
    axiosConfig: { id: userInfo?.id },
  });

  return (
    <S.Container>
      <BackButton />
      <NewTeamPostDetailWithLoading />
      <UpperButton />
    </S.Container>
  );
}
