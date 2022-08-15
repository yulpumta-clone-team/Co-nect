import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Common/Loader';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

CardsGrid.propTypes = {
  CardComponent: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  clickLink: PropTypes.string,
};

export default function CardsGrid({ CardComponent, cards, clickLink }) {
  const navaigate = useNavigate();
  const handleClickCardComponent = (cardId) => {
    clickLink && navaigate(clickLink + cardId);
  };
  return (
    <S.Cards>
      {cards.length === 0 ? (
        <Loader />
      ) : (
        cards.map(({ id, ...cardInfo }) => (
          <CardComponent
            onClick={() => handleClickCardComponent(id)}
            key={id}
            cardInfo={{ ...cardInfo, id }}
          />
        ))
      )}
    </S.Cards>
  );
}
