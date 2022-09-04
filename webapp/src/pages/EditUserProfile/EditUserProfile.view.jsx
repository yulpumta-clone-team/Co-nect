import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import TextInput from 'components/Common/TextInput';
import TechStackSelectInput from 'components/TechStackSelectInput';
import SelectInput from 'components/Common/SelectInput';
import MarkdownEditor from 'components/MarkdownEditor';
import { belongTeamOptions, hopeSessionOption, jobOptions, skillStack } from 'constant';
import { skillStackParser } from 'service/skillStack.parser';
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
  isNickNameSameWithOrigin: PropTypes.bool.isRequired,
  onChangeCheckNicknameDuplicate: PropTypes.func.isRequired,
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
  onChangeCheckNicknameDuplicate,
  onClickCheckDuplicateNickname,
  profileImageSrc,
  onChangeFile,
}) {
  const inputFileRef = useRef();

  const onUploadButtonClick = () => {
    inputFileRef.current.click();
  };

  const parsedSkillStackOptions = skillStackParser(skillStack);

  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');
  const isNicknameValidateError = isTargetSatisfyValidate('nickname');
  const isSloganValidateError = isTargetSatisfyValidate('slogan');

  const canActivateNicknameDuplicateButton = isNickNameSameWithOrigin;

  // 원래 닉네임과 닉네임 인풋 값이 같을 때, 원래 닉네임과 닉네임 인풋 값이 다른데 중복도 아닐 때,모든 인풋값에 대한 validation 만족,
  const canActiveSubmitButton = () => {
    if (isNickNameSameWithOrigin) {
      return !satisfyAllValidates;
    }
    if (isNicknameDuplicate) {
      return true;
    }
    return !satisfyAllValidates;
  };

  return (
    <S.PostContainer>
      <S.Form onSubmit={submitHandler} id="editUserProfileForm">
        <S.ProfileImageContainer>
          {profileImageSrc ? (
            <S.InputTypeImageHandler htmlFor="profileImage">
              <S.ImageThunbnail alt="upload" src={profileImageSrc} />
              <Button
                type="button"
                theme="secondary"
                customStyle={S.ImageEditButton}
                onClick={onUploadButtonClick}
              >
                수정
              </Button>
            </S.InputTypeImageHandler>
          ) : (
            <S.InputTypeImageHandler htmlFor="profileImage">
              <div>
                <S.PlusSolid />
              </div>
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
              onChange={(event) => {
                onChangeCheckNicknameDuplicate(event);
                onChangeHandler(event);
              }}
              isError={isNicknameValidateError}
              helperText={validateError.nickname}
            />
            <Button
              type="button"
              htmlFor="checkDuplicateNickname"
              theme="secondary"
              customStyle={S.DuplicateCheckButton}
              disabled={canActivateNicknameDuplicateButton}
              onClick={onClickCheckDuplicateNickname}
            >
              중복확인
            </Button>
          </S.DuplicateCheckInput>
          <TechStackSelectInput
            name="techSkills"
            placeholder="기술"
            label="기술"
            selectedTechSkills={inputValues.techSkills}
            techSkillOptions={parsedSkillStackOptions}
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
          <SelectInput
            name="hopeSession"
            label="회망 기간"
            placeHolder="회망 기간"
            defaultOption={hopeSessionOption[0]}
            options={hopeSessionOption}
            value={inputValues.hopeSession}
            onChange={onChangeHandlerWithSelect}
          />
          <SelectInput
            name="job"
            label="직업"
            placeHolder="직업"
            defaultOption={jobOptions[0]}
            options={jobOptions}
            value={inputValues.job}
            onChange={onChangeHandlerWithSelect}
          />
          <SelectInput
            name="belongTeam"
            label="팀 소속 여부"
            placeHolder="팀 소속 여부"
            defaultOption={belongTeamOptions[0]}
            options={belongTeamOptions}
            value={inputValues.belongTeam}
            onChange={onChangeHandlerWithSelect}
          />
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
