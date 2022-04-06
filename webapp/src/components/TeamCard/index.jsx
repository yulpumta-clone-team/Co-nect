import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TEAM_BOARD } from 'constant/route';
import { CardTitle, CardWrapper, ImgContainer, SessionContainer } from './style';

function TeamCard({ teamInfo }) {
  const { user_id, team_id, name, skills, session, img, read, comment_cnt, like_cnt } = teamInfo;
  return (
    <CardWrapper>
      <h2>좋아요: {like_cnt}</h2>
      <Link to={`${TEAM_BOARD}/${team_id}`}>{name}</Link>
      <CardTitle>{name}</CardTitle>
      <ImgContainer>
        <img src={img} alt="임시" />
      </ImgContainer>
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

TeamCard.propTypes = {
  teamInfo: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    team_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired,
    session: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    read: PropTypes.number.isRequired,
    comment_cnt: PropTypes.number.isRequired,
    like_cnt: PropTypes.number.isRequired,
  }).isRequired,
};

export default TeamCard;
