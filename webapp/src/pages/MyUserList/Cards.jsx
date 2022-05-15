import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import UserCard from 'components/UserCard';
import * as S from './style';

function Cards({ cards }) {
  return (
    <S.Cards>
      {cards.length === 0 ? (
        <Loader />
      ) : (
        cards.map(({ id, ...userInfo }) => <UserCard key={id} userInfo={{ ...userInfo, id }} />)
      )}
    </S.Cards>
  );
}

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
      hope_session: PropTypes.number.isRequired,
      skills: PropTypes.array.isRequired,
      img: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
      comment_cnt: PropTypes.number.isRequired,
      like_cnt: PropTypes.number.isRequired,
      status: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Cards;
