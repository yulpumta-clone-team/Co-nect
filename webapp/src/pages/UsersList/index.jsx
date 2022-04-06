/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeamCard from 'components/TeamCard';
import { CardTitle, CardWrapper, ImgContainer, SessionContainer } from './style';

function Tabs({ setType, categories }) {
  function tempfunction(event, name, team) {
    if (name === '읽은목록') {
      setType('read');
    } else if (name === '좋아하는 목록') {
      setType('like');
    }
  }

  // console.log(categories);
  return (
    <ul>
      {categories.map((category, idx) => (
        <li key={idx}>
          <button onClick={(event) => tempfunction(event, category.name)}>{category.name}</button>
        </li>
      ))}
    </ul>
  );
}
function Articles({ type, read_array, like_array }) {
  return (
    <ul>
      {type === 'read' ? (
        <div>
          {read_array.map((read) => (
            <CardWrapper>
              <h1>{read.team_id}</h1>
              <CardTitle>{read.name}</CardTitle>
              <ImgContainer>
                <img alt="팀 사진" />
              </ImgContainer>
              <span>{read.like_cnt}</span>
            </CardWrapper>
          ))}
        </div>
      ) : (
        <div>
          {like_array.map((like) => (
            <CardWrapper>
              <h1>{like.team_id}</h1>
              <CardTitle>{like.name}</CardTitle>
              <ImgContainer>
                <img alt="좋아요" />
              </ImgContainer>
              <span>{like.like_cnt}</span>
            </CardWrapper>
          ))}
        </div>
      )}
    </ul>
  );
}

function UsersList() {
  const read_array = [
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
  const like_array = [
    {
      team_id: 3,
      name: '윈도우팀플',
      like_cnt: 2,
    },
    {
      team_id: 4,
      name: '444',
      like_cnt: 3,
    },
  ];
  const categories = [
    {
      id: 1,
      name: '읽은목록',
    },
    {
      id: 2,
      name: '좋아하는 목록',
    },
  ];
  const [type, setType] = useState('read');
  // const [read, setRead] = useState(false);
  // const [like_cnt, setLikecnt] = useState(false);
  // const [currentArticles, setArticles] = useState('읽은목록');
  // const { currentArticles, currentCategory } = teamElement
  console.log(type);
  return (
    <div className="App">
      <Tabs setType={setType} categories={categories} />
      <Articles type={type} read_array={read_array} like_array={like_array} />
    </div>
  );
}

export default UsersList;
