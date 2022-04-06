/* eslint-disable react/prop-types */
import React from 'react';
import { CardTitle, CardWrapper, ImgContainer } from './style';

function MyPost() {
  const my_posting = [
    {
      team_id: 1,
      name: '코넥트',
      like_cnt: 0,
    },
    {
      team_id: 2,
      name: '애플팀플',
      like_cnt: 1,
    },
  ];
  return (
    <div>
      {my_posting.map((posting) => (
        <CardWrapper>
          <h1>{posting.team_id}</h1>
          <CardTitle>{posting.name}</CardTitle>
          <ImgContainer>
            <img alt="팀 사진" />
          </ImgContainer>
          <span>{posting.like_cnt}</span>
        </CardWrapper>
      ))}
    </div>
  );
}

export default MyPost;
