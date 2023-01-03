import teamApi from 'api/team.api';
import { API_MESSAGE } from 'constant/api.constant';
import { ROUTE } from 'constant/route.constant';
import useAxios from 'hooks/useAxios';
import useFileUploader from 'hooks/useFileUploader';
import useForm from 'hooks/useForm';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { teamDetailParser, teamEditRequestParser } from 'service/team/team.parser';
import { newTeamPostValidation } from 'service/team/team.validation';
import { teamDetailType } from 'types/team.type';
import EditTeamPostView from './EditTeamPost.view';

EditTeamPostDetail.propTypes = {
  targetTeam: teamDetailType,
};

export default function EditTeamPostDetail({ targetTeam }) {
  const naviate = useNavigate();
  const { teamId, teamName, teamImage, techSkills, hopeSession, content, slogan, writerInfo } =
    teamDetailParser(targetTeam);

  // 수정 요청 api hooks
  const { notGetExecution } = useAxios({
    axiosInstance: teamApi.EDIT_TEAM_POST,
    immediate: false,
    axiosConfig: { id: teamId },
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
    const parsedSubmitData = teamEditRequestParser(changedProfileImageSubmitData);
    await notGetExecution({
      newConfig: { data: parsedSubmitData },
      successMessage: API_MESSAGE.SUCCESS_EDIT_TEAM,
    });
    setTimeout(() => {
      naviate(ROUTE.TEAM);
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
      teamName,
      teamImage,
      techSkills,
      slogan,
      hopeSession,
      content,
    },
    submitCallback,
    validate: newTeamPostValidation,
  });

  const profileImageSrc = (imageFile && URL.createObjectURL(imageFile)) || inputValues.teamImage;

  return (
    <EditTeamPostView
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
