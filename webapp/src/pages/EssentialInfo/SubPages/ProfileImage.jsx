/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import PlusMarkSvg from 'assets/icons/PlusMarkSvg';
import * as S from '../EssentialInfo.style';

// TODO: 이미지 업로드 후 디자인
export default function ProfileImage() {
  const inputFileRef = useRef();
  const { onChangeFile, handleClickNextButton } = useEssentialFormsAction();
  const { imageFile } = useEssentialFormsState();

  const onUploadButtonClick = () => {
    inputFileRef.current.click();
  };
  return (
    <S.Content>
      <h2>프로필 이미지를 골라주세요.</h2>
      {imageFile ? (
        <>
          <S.InputContainer>
            <S.InputTypeImageHandler htmlFor="profileImage">
              <S.ImageThunbnail alt="upload" src={URL.createObjectURL(imageFile)} />
            </S.InputTypeImageHandler>
          </S.InputContainer>
          <S.NextButtonContainerInProfileImage>
            <Button theme="primary" customStyle={S.NextButton} onClick={onUploadButtonClick}>
              재업로드
            </Button>
            <Button theme="primary" customStyle={S.NextButton} onClick={handleClickNextButton}>
              다음
            </Button>
          </S.NextButtonContainerInProfileImage>
        </>
      ) : (
        <>
          <S.InputContainer>
            <S.InputTypeImageHandler htmlFor="profileImage">
              <S.AddImage type="button">
                <PlusMarkSvg />
              </S.AddImage>
            </S.InputTypeImageHandler>
          </S.InputContainer>
          <S.NextButtonContainer>
            <Button theme="primary" customStyle={S.NextButton} onClick={handleClickNextButton}>
              다음
            </Button>
            <span>프로필 이미지 없이 가입을 원할 경우 다음을 눌러주세요.</span>
          </S.NextButtonContainer>
        </>
      )}
      <S.HiddenInputHandler
        ref={inputFileRef}
        id="profileImage"
        name="profileImage"
        type="file"
        accept="image/*"
        onChange={onChangeFile}
      />
    </S.Content>
  );
}
