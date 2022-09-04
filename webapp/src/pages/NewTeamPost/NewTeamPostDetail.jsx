import React from 'react';
import { newTeamPostParser } from 'service/team.parser';
import { skillStackParser } from 'service/skillStack.parser';
import { newTeamPostValidation } from 'service/team.validation';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import useForm from 'hooks/useForm';
import useAxios from 'hooks/useAxios';
import teamApi from 'api/team.api';
import useFileUploader from 'hooks/useFileUploader';
import { ROUTE } from 'constant/route.constant';
import { useNavigate } from 'react-router-dom';
import NewTeamPostView from './NewTeamPost.view';

export default function NewTeamPostDetail() {
  const navigate = useNavigate();
  const notifyDispatch = useToastNotificationAction();

  const [state, execution] = useAxios({
    axiosInstance: teamApi.POST_TEAM_POST,
    immediate: false,
  });

  // s3 이미지 업로더 api hooks
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

  // post 요청
  const submitCallback = async (submitData) => {
    const changedProfileImageSubmitData = await uploadImageFileBeforeSubmit(submitData);
    const parsedSubmitData = newTeamPostParser(changedProfileImageSubmitData);
    await execution({ data: parsedSubmitData });
    navigate(ROUTE.HOME);
    notifyNewMessage(notifyDispatch, '저장 완료!', TOAST_TYPE.Success);
  };
  const {
    inputValues,
    validateError,
    onChangeHandler,
    onChangeHandlerWithSelect,
    submitHandler,
    satisfyAllValidates,
    isTargetSatisfyValidate,
  } = useForm({
    initialValues: {
      name: '',
      techSkills: [],
      profileImage: '',
      hopeSession: '',
      slogan: '',
      introduction: '',
    },
    submitCallback,
    validate: newTeamPostValidation,
  });

  const profileImageSrc = inputValues.profileImage || (imageFile && URL.createObjectURL(imageFile));

  return (
    <NewTeamPostView
      inputValues={inputValues}
      onChangeHandler={onChangeHandler}
      onChangeHandlerWithSelect={onChangeHandlerWithSelect}
      submitHandler={submitHandler}
      validateError={validateError}
      satisfyAllValidates={satisfyAllValidates}
      isTargetSatisfyValidate={isTargetSatisfyValidate}
      profileImageSrc={profileImageSrc}
      onChangeFile={onChangeFile}
    />
  );
}
