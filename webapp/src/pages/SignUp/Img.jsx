import React from 'react';

export default function nickname() {
  return (
    <>
      <input
        name="profile-image"
        onChange={onImgChange}
        value={userImg}
        placeholder="임시 프로필 이미지 문자열로 입력"
      />{' '}
    </>
  );
}
