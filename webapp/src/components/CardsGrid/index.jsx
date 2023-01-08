import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Common/Button';
import CardLoader from 'components/Common/Loader/CardLoader';
import SimpleListComponent from 'hoc/SimpleListComponent';
import * as S from './CardsGrid.style';

CardsGrid.propTypes = {
  CardComponent: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  clickLink: PropTypes.string,
  emptyTrigger: PropTypes.shape({
    emptyMessage: PropTypes.string.isRequired,
    triggerLink: PropTypes.string.isRequired,
    triggerMessage: PropTypes.string.isRequired,
  }),
};

export default function CardsGrid({ CardComponent, cards, isLoading, clickLink, emptyTrigger }) {
  const { emptyMessage, triggerLink, triggerMessage } = emptyTrigger;
  const navigate = useNavigate();
  const handleClickCardComponent = (cardId) => {
    clickLink && navigate(clickLink + cardId);
  };
  const handleClickTriggerLink = () => navigate(triggerLink);

  // 기존 카드 길이도 없고 로딩인 상황 : 초기 렌더링 -> 이 때만 전체 페이지 로딩 표시
  // 기존 카드는 있고 로딩인 상황 : 기존 카드는 그대로 보여지고 맨 아래 로딩 처리만
  if (cards.length === 0 && isLoading)
    return (
      <S.Cards>
        <SimpleListComponent Component={CardLoader} idx={3} />
      </S.Cards>
    );

  return (
    <S.Cards>
      {cards.length === 0 ? (
        <S.Empty>
          <h3>{emptyMessage}</h3>
          <Button theme="primary" onClick={handleClickTriggerLink} customStyle={S.Button}>
            {triggerMessage}
          </Button>
        </S.Empty>
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
