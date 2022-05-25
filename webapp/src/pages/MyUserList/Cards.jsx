import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import UserCard from 'components/UserCard';
import * as S from './style';

function Cards({ cards }) {
  console.log('cards', cards);
  return (
    <S.Cards>
      {cards.length === 0 ? (
        <Loader />
      ) : (
        cards.map(({ id, ...userInfo }) => <UserCard key={id} cardInfo={{ ...userInfo, id }} />)
      )}
    </S.Cards>
  );
}

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
};

export default Cards;
