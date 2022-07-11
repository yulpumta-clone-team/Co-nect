import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { USER } from 'constant/route';
import { CardTitle, CardWrapper, ImgContainer, SessionContainer } from './style';

UserCard.propTypes = {
  cardInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hopeSession: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.number).isRequired,
    commentCnt: PropTypes.number.isRequired,
    likeCnt: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};

export default function UserCard({ cardInfo }) {
  const { id, name, hopeSession, likeCnt, status } = cardInfo;
  return (
    <CardWrapper>
      <h1>{id}</h1>
      <h2>좋아요: {likeCnt}</h2>
      <Link to={`${USER}/${id}`}>{name}</Link>
      <SessionContainer>{hopeSession}</SessionContainer>
    </CardWrapper>
  );
}
