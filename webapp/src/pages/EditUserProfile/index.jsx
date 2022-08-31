import React, { useState } from 'react';
import userApi from 'api/user.api';
import WithLoading from 'hoc/WithLoading';
import useAxios from 'hooks/useAxios';
import BackButton from 'components/Common/BackButton';
import useFileUploader from 'hooks/useFileUploader';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { getUserInfo } from 'service/auth';
import UpperButton from 'components/Common/UpperButton';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import EditUserProfileDetail from './EditUserProfileDetail';
import * as S from './EditUserProfile.style';

export default function EditUserProfile() {
  const userInfo = getUserInfo(); // {id, name, profileImg}
  const notifyDispatch = useToastNotificationAction();
  const EditUserProfileDetailWithLoading = WithLoading({
    Component: EditUserProfileDetail,
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: userInfo.id },
  });

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
    console.log(changedProfileImageSubmitData);
    await execution({ data: changedProfileImageSubmitData });
    // TODO: 성공시 이동할 페이지 정해서 이동시키기
    notifyNewMessage(notifyDispatch, '수정 완료!', TOAST_TYPE.Success);
  };

  return (
    <S.Container>
      <BackButton />
      <EditUserProfileDetailWithLoading
        submitCallback={submitCallback}
        onChangeFile={onChangeFile}
        imageFile={imageFile}
      />
      <UpperButton />
    </S.Container>
  );
}
