/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Button from 'components/Common/Button';
import useFileUploader from 'hooks/useFileUploader';
import * as S from '../EssentialInfo.style';

ProfileImage.propTypes = {};

// TODO: 이미지 업로드 후 디자인
export default function ProfileImage({}) {
  const { imageFile, fileHandler, setImageFile } = useFileUploader();
  return (
    <S.Content>
      <h2>프로필 이미지를 골라주세요.</h2>
      <S.InputContainer>
        {imageFile && (
          <div>
            <img alt="not fount" src={URL.createObjectURL(imageFile)} />
            <button onClick={() => setImageFile(null)}>Remove</button>
          </div>
        )}
        <S.InputTypeImageHandler htmlFor="ProfileImage">
          <div>
            <S.PlusSolid />
          </div>
          <S.HiddenInputHandler
            id="ProfileImage"
            type="file"
            accept="image/*"
            onChange={fileHandler}
          />
        </S.InputTypeImageHandler>
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
