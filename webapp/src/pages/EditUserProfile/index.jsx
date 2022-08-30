import React, { useState } from 'react';
import userApi from 'api/user.api';
import WithLoading from 'hoc/WithLoading';
import useAxios from 'hooks/useAxios';
import BackButton from 'components/Common/BackButton';
import useFileUploader from 'hooks/useFileUploader';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import EditUserProfileDetail from './EditUserProfileDetail';
import * as S from './EditUserProfile.style';

const USER_ID = 3;

export default function EditUserProfile() {
  const notifyDispatch = useToastNotificationAction();
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

  const { uploadFileOnS3, imageFile, onChangeFile } = useFileUploader({
    notifyNewMessage,
    notifyDispatch,
  });

  const uploadImageFileBeforeSubmit = async (submitData) => {
    const response = await uploadFileOnS3();
    if (response) {
      const { id, path } = response;
      return { ...submitData, profileImage: path };
    }
    return submitData;
  };

  const submitCallback = async (submitData) => {
    const changedProfileImageSubmitData = await uploadImageFileBeforeSubmit(submitData);
    await execution({ id, data: changedProfileImageSubmitData });
    // TODO: 성공시 이동할 페이지 정해서 이동시키기
  };

  return (
    <S.Container>
      <BackButton />
      <EditUserProfileDetailWithLoading
        submitCallback={submitCallback}
        onChangeFile={onChangeFile}
        imageFile={imageFile}
      />
    </S.Container>
  );
}
