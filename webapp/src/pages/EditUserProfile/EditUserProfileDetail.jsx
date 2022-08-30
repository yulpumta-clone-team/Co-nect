import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'components/Common/Image';
import { userEditParser } from 'service/user.parser';
import TechStackSelectInput from 'components/TechStackSelectInput';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import SelectInput from 'components/Common/SelectInput';
import { skillStackParser } from 'service/skillStack.parser';
import { belongTeamOptions, hopeSessionOption, jobOptions } from 'constant';
import { editUserValidation } from 'service/user.validation';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import authApi from 'api/auth.api';
import useForm from 'hooks/useForm';
import { userEditType } from 'types/user.type';
import MarkdownEditor from 'components/MarkdownEditor';
import * as S from './EditUserProfile.style';

EditUserProfileView.propTypes = {
  targetUser: userEditType,
  submitCallback: PropTypes.func.isRequired,
};

const initialValues = {
  nickname: '',
  profileImage: '',
  techSkills: [],
  slogan: '',
  hopeSession: '',
  job: '',
  belongTeam: '',
  introduction: '',
  portfolio: '',
};

export default function EditUserProfileView({ targetUser, submitCallback }) {
  const notifyDispatch = useToastNotificationAction();
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);
  const {
    inputValues,
    validateError,
    onChangeHandler,
    onChangeHandlerWithSelect,
    submitHandler,
    satisfyAllValidates,
    isTargetSatisfyValidate,
  } = useForm({
    initialValues,
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

  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');
  const isNicknameValidateError = isTargetSatisfyValidate('nickname');
  const isSloganValidateError = isTargetSatisfyValidate('slogan');

  const parsedTargerUserInfo = userEditParser(targetUser);
  const { userId, skills } = parsedTargerUserInfo;
  const parsedSkillStack = skillStackParser(skills);

  return (
    <S.PostContainer>
      <S.ProfileImageContainer>
        <Image src="img" alt="프로필 이미지" />
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
          techSkillOptions={parsedSkillStack}
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
          defaultOption={hopeSessionOption[0]}
          options={hopeSessionOption}
          value={inputValues.hopeSession}
          onChange={onChangeHandlerWithSelect}
        />
        <SelectInput
          name="job"
          label="직업"
          defaultOption={jobOptions[0]}
          options={jobOptions}
          value={inputValues.job}
          onChange={onChangeHandlerWithSelect}
        />
        <SelectInput
          name="belongTeam"
          label="팀 소속 여부"
          defaultOption={belongTeamOptions[0]}
          options={belongTeamOptions}
          value={inputValues.belongTeam}
          onChange={onChangeHandlerWithSelect}
        />
        <MarkdownEditor />
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
