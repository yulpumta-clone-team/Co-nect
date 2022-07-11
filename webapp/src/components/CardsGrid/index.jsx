import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import * as S from './style';

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  CardComponent: PropTypes.func.isRequired,
};

export default function Cards({ cards, CardComponent }) {
  return (
    <S.Cards>
      {cards.length === 0 ? (
        <Loader />
      ) : (
        cards.map(({ id, ...cardInfo }) => (
          <CardComponent key={id} cardInfo={{ ...cardInfo, id }} />
        ))
      )}
    </S.Cards>
  );
}
