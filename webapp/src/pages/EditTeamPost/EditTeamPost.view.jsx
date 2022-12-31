import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from 'components/MarkdownEditor';
import { hopeSessionOption } from 'constant';
import Button from 'components/Common/Button';
import TechStackSelectInput from 'components/TechStackSelectInput';
import SelectInput from 'components/Common/SelectInput';
import TextInput from 'components/Common/TextInput';
import EditImageSvg from 'assets/icons/EditImageSvg';
import PlusMarkSvg from 'assets/icons/PlusMarkSvg';
import Image from 'components/Common/Image';
import * as S from './EditTeamPost.style';

EditTeamPostView.propTypes = {
  inputValues: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  onChangeHandlerWithSelect: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  validateError: PropTypes.object.isRequired,
  satisfyAllValidates: PropTypes.bool.isRequired,
  isTargetSatisfyValidate: PropTypes.func.isRequired,
  profileImageSrc: PropTypes.string,
  onChangeFile: PropTypes.func.isRequired,
};

export default function EditTeamPostView({
  inputValues,
  onChangeHandler,
  onChangeHandlerWithSelect,
  submitHandler,
  validateError,
  satisfyAllValidates,
  isTargetSatisfyValidate,
  profileImageSrc,
  onChangeFile,
}) {
  const inputFileRef = useRef();

  const onUploadButtonClick = () => {
    inputFileRef.current.click();
  };

  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');
  const isTeamNameValidateError = isTargetSatisfyValidate('teamName');
  const isSloganValidateError = isTargetSatisfyValidate('slogan');

  const canActivateSubmitButton = !satisfyAllValidates;
  return (
    <S.PostContainer>
      <S.Form onSubmit={submitHandler} id="newTeamPostForm">
        <S.InfoContainer>
          <S.ImgContainer>
            {profileImageSrc ? (
              <S.InputTypeImageHandler htmlFor="profileImage">
                <Image alt="upload" src={profileImageSrc} customStyle={S.ViewingImage} />
                <S.ImageEditButton onClick={onUploadButtonClick}>
                  <EditImageSvg />
                </S.ImageEditButton>
              </S.InputTypeImageHandler>
            ) : (
              <S.InputTypeImageHandler htmlFor="profileImage">
                <S.AddImage type="button">
                  <PlusMarkSvg />
                </S.AddImage>
              </S.InputTypeImageHandler>
            )}
            <S.HiddenInputHandler
              ref={inputFileRef}
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={onChangeFile}
            />
          </S.ImgContainer>
          <S.PostInfoContainer>
            <TextInput
              name="teamName"
              label="팀 이름"
              placeholder="팀 이름"
              value={inputValues.teamName}
              onChange={onChangeHandler}
              helperText={validateError.teamName}
              isError={isTeamNameValidateError}
            />
            <TechStackSelectInput
              name="techSkills"
              placeholder="필요 기술 스택"
              label="기술 스택"
              selectedTechSkills={inputValues.techSkills}
              onChange={onChangeHandlerWithSelect}
              helperText={validateError.techSkills}
              isError={isSkillsValidateError}
            />
            <SelectInput
              name="hopeSession"
              label="회망 작업 기간"
              placeHolder="개월 수"
              defaultOption={hopeSessionOption[0]}
              options={hopeSessionOption}
              value={inputValues.hopeSession}
              onChange={onChangeHandlerWithSelect}
            />
            <TextInput
              name="slogan"
              label="프로젝트 슬로건"
              placeholder="프로젝트 슬로건"
              value={inputValues.slogan}
              onChange={onChangeHandler}
              helperText={validateError.slogan}
              isError={isSloganValidateError}
            />
            <MarkdownEditor
              name="introduction"
              onlyViewer={false}
              label="프로젝트 소개"
              placeholder="프로젝트 소개를 입력해주세요."
              content={inputValues.content}
              onChange={onChangeHandler}
            />
          </S.PostInfoContainer>
        </S.InfoContainer>
      </S.Form>
      <S.ButtonContainer>
        <Button
          theme="primary"
          type="submit"
          form="newTeamPostForm"
          disabled={canActivateSubmitButton}
          customStyle={S.SubmitButton}
        >
          저장
        </Button>
      </S.ButtonContainer>
    </S.PostContainer>
  );
}
