import React from 'react';
import { userEditParser, userPostEditParser } from 'service/user/user.parser';
import { skillStackParser } from 'service/skillStack.parser';
import { editUserValidation } from 'service/user/user.validation';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import useForm from 'hooks/useForm';
import { userDetailType } from 'types/user.type';
import useAxios from 'hooks/useAxios';
import userApi from 'api/user.api';
import useFileUploader from 'hooks/useFileUploader';
import useCheckNicknameDuplicate from 'hooks/useCheckNicknameDuplicate';
import EditUserProfileView from './EditUserProfile.view';

EditUserProfileDetail.propTypes = {
  targetUser: userDetailType,
};

export default function EditUserProfileDetail({ targetUser }) {
  const notifyDispatch = useToastNotificationAction();

  const parsedTargerUserInfo = userEditParser(targetUser);
  const {
    userId,
    nickname,
    profileImage,
    techSkills,
    slogan,
    hopeSession,
    job,
    belongTeam,
    introduction,
    portfolio,
  } = parsedTargerUserInfo;
  const parsedSkillStack = skillStackParser(techSkills);

  const {
    isNicknameDuplicate,
    isNickNameSameWithOrigin,
    onChangeCheckNicknameDuplicate,
    onClickCheckDuplicateNickname,
  } = useCheckNicknameDuplicate(nickname);

  // 수정 요청 api hooks
  const [state, execution, foreceRefetch] = useAxios({
    axiosInstance: userApi.EDIT_USER_PROFILE,
    immediate: false,
  });

  // s3 이미지 업로더 api hooks
  const { uploadFileOnS3, imageFile, onChangeFile } = useFileUploader();

  const uploadImageFileBeforeSubmit = async (submitData) => {
    const response = await uploadFileOnS3();
    if (response) {
      const { id, path } = response;
      return { ...submitData, profileImage: path };
    }
    return submitData;
  };

  // 수정 요청
  const submitCallback = async (submitData) => {
    const changedProfileImageSubmitData = await uploadImageFileBeforeSubmit(submitData);
    const parsedSubmitData = userPostEditParser(changedProfileImageSubmitData);
    await execution({ data: parsedSubmitData });
    // TODO: 성공시 이동할 페이지 정해서 이동시키기
    notifyNewMessage(notifyDispatch, '수정 완료!', TOAST_TYPE.Success);
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
      nickname,
      profileImage,
      techSkills: parsedSkillStack,
      slogan,
      hopeSession,
      job,
      belongTeam,
      introduction,
      portfolio,
    },
    submitCallback,
    validate: editUserValidation,
  });

  const profileImageSrc = inputValues.profileImage || (imageFile && URL.createObjectURL(imageFile));

  return (
    <EditUserProfileView
      inputValues={inputValues}
      onChangeHandler={onChangeHandler}
      onChangeHandlerWithSelect={onChangeHandlerWithSelect}
      submitHandler={submitHandler}
      validateError={validateError}
      satisfyAllValidates={satisfyAllValidates}
      isTargetSatisfyValidate={isTargetSatisfyValidate}
      isNicknameDuplicate={isNicknameDuplicate}
      isNickNameSameWithOrigin={isNickNameSameWithOrigin}
      onChangeCheckNicknameDuplicate={onChangeCheckNicknameDuplicate}
      onClickCheckDuplicateNickname={onClickCheckDuplicateNickname}
      profileImageSrc={profileImageSrc}
      onChangeFile={onChangeFile}
    />
  );
}
