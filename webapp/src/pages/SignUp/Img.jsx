import React from 'react';
import useInput from 'hooks/useInput';

export default function Img() {
  const [userImg, onImgChange] = useInput('');
  return (
    <div>
      <input
        name="profile-image"
        onChange={onImgChange}
        value={userImg}
        placeholder="임시 프로필 이미지 문자열로 입력"
      />{' '}
    </div>
  );
}
