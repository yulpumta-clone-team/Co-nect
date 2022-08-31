import React from 'react';
import userApi from 'api/user.api';
import WithLoading from 'hoc/WithLoading';
import BackButton from 'components/Common/BackButton';
import { getUserInfo } from 'service/auth';
import UpperButton from 'components/Common/UpperButton';
import EditUserProfileDetail from './EditUserProfileDetail';
import * as S from './EditUserProfile.style';

export default function EditUserProfile() {
  const userInfo = getUserInfo(); // {id, name, profileImg}
  const EditUserProfileDetailWithLoading = WithLoading({
    Component: EditUserProfileDetail,
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: userInfo?.id },
  });

  return (
    <S.Container>
      <BackButton />
      <EditUserProfileDetailWithLoading />
      <UpperButton />
    </S.Container>
  );
}
