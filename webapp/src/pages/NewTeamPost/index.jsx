import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileInput';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillStack } from 'constant';
import teamApi from 'api/team.api';
import Button from 'components/Common/Button';
import Input from 'components/Common/TextInput';
import BackButton from 'components/Common/BackButton';
import TechStackSelectInput from 'components/TechStackSelectInput';
import useForm from 'hooks/useForm';
import essentialValidation from 'service/essentialForm.validation';
import SelectInput from 'components/Common/SelectInput';
import { skillStackParser } from 'service/skillStack.parser';
import * as S from './style';

export default function NewTeamPost() {
  const navigate = useNavigate();

  const { imageFile, fileHandler } = useFileUploader(null);

  const [teamName, onTeamChange] = useInput('');
  const [slogan, onSloganChange] = useInput('');
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [mdcontent, setContent] = useState('');
  const [error, setError] = useState({ isError: false, msg: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: inputValidation 추가
    const submitData = {
      name: teamName,
      session: hopeSession,
      skills: inputValues.techSkills,
      content: mdcontent,
    };
    try {
      const response = await teamApi.POST_TEAM_POST({ submitData });
      console.log(response);
      // console.log('data', data);
      // TODO: 성공시 이동할 페이지 정해서 이동시키기
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        msg: error,
      });
    }
    navigate('/');
  };
  const {
    inputValues,
    validateError,
    onChangeHandlerWithSelect,
    isTargetSatisfyValidate,
    submitHandler,
    satisfyAllValidates,
  } = useForm({
    initialValues: { techSkills: 'javascript' },
    handleSubmit,
    validate: essentialValidation,
  });
  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');

  const parsedSkillStack = skillStackParser(skillStack);

  return (
    <S.PageContainer>
      <BackButton />
      <S.Container>
        <S.ImgContainer>
          <S.ViewingImage src={imageFile} alt="profile" />
          <Input type="file" accept="image/*" onChange={fileHandler} />
        </S.ImgContainer>
        <S.Form onSubmit={handleSubmit}>
          <S.TeamName>
            팀이름{' '}
            <Input name="팀이름" onChange={onTeamChange} value={teamName} placeholder="팀이름" />
          </S.TeamName>
          <S.TechStack>
            기술 스택
            <TechStackSelectInput
              name="techSkills"
              label="기술"
              selectedTechSkills={inputValues.techSkills}
              techSkillOptions={parsedSkillStack}
              onChange={onChangeHandlerWithSelect}
              isError={isSkillsValidateError}
              helperText={validateError.techSkills}
            />
          </S.TechStack>
          <S.HopeSession>
            희망 작업 기간
            <SelectInput
              name="hopeSession"
              label="회망 기간"
              defaultOption={hopeSessionOption[0]}
              options={hopeSessionOption}
              value={inputValues.hopeSession}
              onChange={onChangeHandlerWithSelect}
            />
          </S.HopeSession>
          <S.Slogan>
            프로젝트 슬로건
            <Input
              name="팀이름"
              onChange={onSloganChange}
              value={slogan}
              placeholder="프로젝트슬로건"
            />
          </S.Slogan>
          <MarkdownEditor mdValue={mdcontent} setContent={setContent} />
          <Button onSubmit={handleSubmit}>제출</Button>
        </S.Form>
      </S.Container>
    </S.PageContainer>
  );
}
