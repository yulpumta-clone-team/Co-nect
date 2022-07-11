import userApi from 'api/user';
import Cards from 'components/CardsGrid';
import TeamCard from 'components/TeamCard';
import React, { useEffect, useState } from 'react';
import { handleFetcher } from 'utils';

import * as S from './style';

export default function MyPost() {
  const [cards, setCards] = useState([]);

  const fetcher = async () => {
    const { value, isError, error } = await handleFetcher(userApi.GET_MY_POSTS);
    if (isError) {
      console.error(error);
    }
    setCards(value);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <S.Container>
      <Cards cards={cards} isUserList={false} CardComponent={TeamCard} />
    </S.Container>
  );
}
