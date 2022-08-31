import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { userEditParser } from 'service/user.parser';
import TechStackSelectInput from 'components/TechStackSelectInput';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import SelectInput from 'components/Common/SelectInput';
import { skillStackParser } from 'service/skillStack.parser';
import { belongTeamOptions, hopeSessionOption, jobOptions, skillStack } from 'constant';
import { editUserValidation } from 'service/user.validation';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import authApi from 'api/auth.api';
import useForm from 'hooks/useForm';
import { userEditType } from 'types/user.type';
import MarkdownEditor from 'components/MarkdownEditor';
import * as S from './EditUserProfile.style';

EditUserProfileDetail.propTypes = {
  targetUser: userEditType,
  submitCallback: PropTypes.func.isRequired,
  onChangeFile: PropTypes.func.isRequired,
  imageFile: PropTypes.string,
};

export default function EditUserProfileDetail({
  targetUser,
  submitCallback,
  onChangeFile,
  imageFile,
}) {
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
  const parsedSkillStackOptions = skillStackParser(skillStack);
  const parsedSkillStack = skillStackParser(techSkills);

  const notifyDispatch = useToastNotificationAction();
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);
  const inputFileRef = useRef();

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

  const onClickCheckDuplicateNickname = async () => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    try {
      const response = await authApi.checkDuplicateNickName({ name: inputValues.nickname });
      const isDuplicated = response.data;
      if (isDuplicated) {
        notifyNewMessage(notifyDispatch, '이미 사용중인 닉네임입니다!', TOAST_TYPE.Warning);
        setIsNicknameDuplicate(true);
      } else {
        notifyNewMessage(notifyDispatch, '사용가능한 닉네임입니다!', TOAST_TYPE.Success);
        setIsNicknameDuplicate(false);
      }
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error);
      setIsNicknameDuplicate(true);
    }
  };

  const onUploadButtonClick = () => {
    inputFileRef.current.click();
  };

  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');
  const isNicknameValidateError = isTargetSatisfyValidate('nickname');
  const isSloganValidateError = isTargetSatisfyValidate('slogan');

  return (
    <S.PostContainer>
      <S.ProfileImageContainer>
        {imageFile ? (
          <S.InputTypeImageHandler htmlFor="profileImage">
            <S.ImageThunbnail alt="upload" src={URL.createObjectURL(imageFile)} />
            <Button theme="secondary" customStyle={S.ImageEditButton} onClick={onUploadButtonClick}>
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
            name="nickname"
            label="닉네임"
            placeholder="닉네임"
            value={inputValues.nickname}
            onChange={onChangeHandler}
            isError={isNicknameValidateError}
            helperText={validateError.nickname}
          />
          <Button
            theme="secondary"
            customStyle={S.DuplicateCheckButton}
            disabled={isNicknameValidateError}
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
          value={inputValues.belongTeam.value}
          onChange={onChangeHandlerWithSelect}
        />
        <MarkdownEditor
          onlyViewer={false}
          label="자기 소개"
          placeholder="자기 소개를 입력해주세요."
          content={introduction}
        />
        <TextInput
          name="portfolio"
          label="포트폴리오(url)"
          placeholder="포트폴리오(url)"
          value={inputValues.portfolio}
          onChange={onChangeHandler}
        />
      </S.InfoContainer>
    </S.PostContainer>
  );
}
