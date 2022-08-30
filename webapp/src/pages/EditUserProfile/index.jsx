import React, { useState } from 'react';
import userApi from 'api/user.api';
import WithLoading from 'hoc/WithLoading';
import useAxios from 'hooks/useAxios';
import BackButton from 'components/Common/BackButton';
import EditUserProfileDetail from './EditUserProfileDetail';
import * as S from './EditUserProfile.style';

const USER_ID = 3;

export default function EditUserProfile() {
  const EditUserProfileDetailWithLoading = WithLoading({
    Component: EditUserProfileDetail,
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: USER_ID },
  });

  const [id, setId] = useState(USER_ID);

  const [state, execution, foreceRefetch] = useAxios({
    axiosInstance: userApi.EDIT_USER_PROFILE,
    immediate: false,
  });

  const submitCallback = async (submitData) => {
    await execution({ id, data: submitData });
    // TODO: 성공시 이동할 페이지 정해서 이동시키기
  };

  return (
    <S.Container>
      <BackButton />
      <EditUserProfileDetailWithLoading submitCallback={submitCallback} />
    </S.Container>
  );
}
