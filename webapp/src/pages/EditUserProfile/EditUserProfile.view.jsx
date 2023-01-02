import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import TextInput from 'components/Common/TextInput';
import TechStackSelectInput from 'components/TechStackSelectInput';
import SelectInput from 'components/Common/SelectInput';
import MarkdownEditor from 'components/MarkdownEditor';
import { hopeSessionOption, jobOptions } from 'constant';
import TeamBelongCheckInput from 'components/TeamBelongCheckInput';
import PlusMarkSvg from 'assets/icons/PlusMarkSvg';
import EditImageSvg from 'assets/icons/EditImageSvg';
import Image from 'components/Common/Image';
import * as S from './EditUserProfile.style';

EditUserProfileView.propTypes = {
  inputValues: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  onChangeHandlerWithSelect: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  validateError: PropTypes.object.isRequired,
  satisfyAllValidates: PropTypes.bool.isRequired,
  isTargetSatisfyValidate: PropTypes.func.isRequired,
  isNicknameDuplicate: PropTypes.bool.isRequired,
  isNickNameSameWithOrigin: PropTypes.func.isRequired,
  onClickCheckDuplicateNickname: PropTypes.func.isRequired,
  profileImageSrc: PropTypes.string,
  onChangeFile: PropTypes.func.isRequired,
};

export default function EditUserProfileView({
  inputValues,
  onChangeHandler,
  onChangeHandlerWithSelect,
  submitHandler,
  validateError,
  satisfyAllValidates,
  isTargetSatisfyValidate,
  isNicknameDuplicate,
  isNickNameSameWithOrigin,
  onClickCheckDuplicateNickname,
  profileImageSrc,
  onChangeFile,
}) {
  const inputFileRef = useRef();

  const onUploadButtonClick = () => {
    inputFileRef.current.click();
  };

  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');
  const isNicknameValidateError = isTargetSatisfyValidate('nickname');
  const isSloganValidateError = isTargetSatisfyValidate('slogan');

  const canActivateNicknameDuplicateButton = isNickNameSameWithOrigin();

  //  원래 닉네임과 닉네임 인풋 값이 다른데 중복도 아닐 때,모든 인풋값에 대한 validation 만족,
  const canActiveSubmitButton = () => {
    // 원래 닉네임과 닉네임 인풋 값이 같을 때는 모든 인풋값에 대한 validation만 체크
    if (isNickNameSameWithOrigin(inputValues.nickname)) {
      return !satisfyAllValidates;
    }
    // 원랙 닉네임과 닉네임 인풋이 다를 때는 중복 체크 및 모든 인풋값에 대한 validation만 체크
    if (isNicknameDuplicate) {
      return true || !satisfyAllValidates;
    }
    return !satisfyAllValidates;
  };

  return (
    <S.PostContainer>
      <S.Form onSubmit={submitHandler} id="editUserProfileForm">
        <S.ProfileImageContainer>
          {profileImageSrc ? (
            <S.InputTypeImageHandler htmlFor="profileImage">
              <Image alt="upload" src={profileImageSrc} customStyle={S.ImageThunbnail} />
              <S.ImageEditButton onClick={onUploadButtonClick} type="button">
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
        </S.ProfileImageContainer>
        <S.InfoContainer>
          <S.DuplicateCheckInput>
            <TextInput
              id="checkDuplicateNickname"
              name="nickname"
              label="닉네임"
              placeholder="닉네임"
              value={inputValues.nickname}
              onChange={onChangeHandler}
              isError={isNicknameValidateError}
              helperText={validateError.nickname}
            />
            <Button
              type="button"
              htmlFor="checkDuplicateNickname"
              theme="secondary"
              customStyle={S.DuplicateCheckButton}
              disabled={canActivateNicknameDuplicateButton}
              onClick={() => onClickCheckDuplicateNickname(inputValues.nickname)}
            >
              중복확인
            </Button>
          </S.DuplicateCheckInput>
          <SelectInput
            name="job"
            label="직업"
            placeHolder="직업"
            defaultOption={jobOptions[0]}
            options={jobOptions}
            value={inputValues.job}
            onChange={onChangeHandlerWithSelect}
          />
          <TechStackSelectInput
            name="techSkills"
            placeholder="기술"
            label="기술"
            selectedTechSkills={inputValues.techSkills}
            onChange={onChangeHandlerWithSelect}
            isError={isSkillsValidateError}
            helperText={validateError.techSkills}
          />
          <TextInput
            name="slogan"
            label="슬로건"
            placeholder="슬로건"
            value={inputValues.slogan}
            onChange={onChangeHandler}
            isError={isSloganValidateError}
            helperText={validateError.slogan}
          />
          <S.InlineInputContainer>
            <SelectInput
              name="hopeSession"
              label="회망 기간"
              placeHolder="회망 기간"
              defaultOption={hopeSessionOption[0]}
              options={hopeSessionOption}
              value={inputValues.hopeSession}
              onChange={onChangeHandlerWithSelect}
            />
            <TeamBelongCheckInput
              name="belongTeam"
              label="팀 소속 여부"
              value={inputValues.belongTeam}
              onChange={onChangeHandlerWithSelect}
            />
          </S.InlineInputContainer>
          <MarkdownEditor
            name="introduction"
            onlyViewer={false}
            label="자기 소개"
            placeholder="자기 소개를 입력해주세요."
            content={inputValues.introduction}
            onChange={onChangeHandler}
          />
          <TextInput
            name="portfolio"
            label="포트폴리오(url)"
            placeholder="포트폴리오(url)"
            value={inputValues.portfolio}
            onChange={onChangeHandler}
          />
        </S.InfoContainer>
      </S.Form>
      <S.ButtonContainer>
        <Button
          theme="primary"
          type="submit"
          form="editUserProfileForm"
          disabled={canActiveSubmitButton()}
          customStyle={S.SubmitButton}
        >
          저장
        </Button>
      </S.ButtonContainer>
    </S.PostContainer>
  );
}
