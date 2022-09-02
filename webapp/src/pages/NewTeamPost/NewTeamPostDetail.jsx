import React from 'react';
import { newTeamPostParser } from 'service/team.parser';
import { skillStackParser } from 'service/skillStack.parser';
import { newTeamPostValidation } from 'service/team.validation';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import useForm from 'hooks/useForm';
import { teamDetailType } from 'types/team.type';
import useAxios from 'hooks/useAxios';
import teamApi from 'api/team.api';
import useFileUploader from 'hooks/useFileUploader';
import NewTeamPostView from './NewTeamPost.view';
import { newTeamPostParser } from 'service/team.parser';

NewTeamPostDetail.propTypes = {
  targetUser: teamDetailType,
};

export default function NewTeamPostDetail({ targetNewTeamPost }) {
  const notifyDispatch = useToastNotificationAction();

  const parsedTargetNewTeamPost = newTeamPostParser(targetNewTeamPost);
  const { name, session, skills, content, slogan } = parsedTargetNewTeamPost;

  const parsedSkillStack = skillStackParser(techSkills);

  const [state, execution] = useAxios({ axiosInstance: teamApi.POST_TEAM_POST, immediate: false });

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
    isTargetSatisfyValidate,
  } = useForm({
    initialValues: {
      name,
      profileImage,
      techSkills: parsedSkillStack,
      slogan,
      hopeSession,
      introduction,
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
      isTargetSatisfyValidate={isTargetSatisfyValidate}
      profileImageSrc={profileImageSrc}
      onChangeFile={onChangeFile}
    />
  );
}
