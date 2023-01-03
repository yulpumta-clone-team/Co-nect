import React from 'react';
import { userDetailParser, userPostEditParser } from 'service/user/user.parser';
import { skillStackParser } from 'service/etc/skillStack.parser';
import { editUserValidation } from 'service/user/user.validation';
import useForm from 'hooks/useForm';
import { userDetailType } from 'types/user.type';
import useAxios from 'hooks/useAxios';
import userApi from 'api/user.api';
import useFileUploader from 'hooks/useFileUploader';
import useCheckUserDuplicate from 'hooks/useCheckUserDuplicate';
import { API_MESSAGE } from 'constant/api.constant';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import EditUserProfileView from './EditUserProfile.view';

EditUserProfileDetail.propTypes = {
  targetUser: userDetailType,
};

export default function EditUserProfileDetail({ targetUser }) {
  const naviate = useNavigate();
  const parsedTargerUserInfo = userDetailParser(targetUser);
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

  const { isNicknameDuplicate, isNickNameSameWithOrigin, onClickCheckDuplicateNickname } =
    useCheckUserDuplicate(nickname);

  // 수정 요청 api hooks
  const { notGetExecution } = useAxios({
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
    await notGetExecution({
      newConfig: { data: parsedSubmitData },
      successMessage: API_MESSAGE.SUCCESS_EDIT_USER,
    });
    setTimeout(() => {
      naviate(ROUTE.USER);
    }, 1000);
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

  const profileImageSrc = (imageFile && URL.createObjectURL(imageFile)) || inputValues.profileImage;

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
      onClickCheckDuplicateNickname={onClickCheckDuplicateNickname}
      profileImageSrc={profileImageSrc}
      onChangeFile={onChangeFile}
    />
  );
}
