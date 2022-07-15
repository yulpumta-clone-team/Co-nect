import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TEAM } from 'constant/route';
import { CardTitle, CardWrapper, ImgContainer, SessionContainer } from './style';

TeamCard.propTypes = {
  cardInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    session: PropTypes.string.isRequired,
    read: PropTypes.number.isRequired,
    skills: PropTypes.arrayOf(PropTypes.number).isRequired,
    commentCnt: PropTypes.number.isRequired,
    likeCnt: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default function TeamCard({ cardInfo, onClick }) {
  const { id, name, skills, session, img, read, likeCnt, commentCnt, user } = cardInfo;
  return (
    <CardWrapper onClick={onClick}>
      <h1>id: {id}</h1>
      <h2>좋아요: {likeCnt}</h2>
      <CardTitle>{name}</CardTitle>
      <ImgContainer>{/* <img src={img} alt="임시" /> */}</ImgContainer>
      <SessionContainer>{session}</SessionContainer>
      <ul>
        {skills.map((skill, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx}>{skill}</li>
        ))}
      </ul>
    </CardWrapper>
  );
}
