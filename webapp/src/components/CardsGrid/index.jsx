import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import UserCard from 'components/UserCard';
import TeamCard from 'components/TeamCard';
import * as S from './style';

function Cards({ isUserList, cards }) {
  const Card = isUserList ? UserCard : TeamCard;

  return (
    <S.Cards>
      {cards.length === 0 ? (
        <Loader />
      ) : (
        cards.map(({ id, ...cardInfo }) => <Card key={id} cardInfo={{ ...cardInfo, id }} />)
      )}
    </S.Cards>
  );
}

Cards.propTypes = {
  isUserList: PropTypes.bool.isRequired,
  cards: PropTypes.array.isRequired,
};

export default Cards;
