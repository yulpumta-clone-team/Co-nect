import useInput from 'hooks/useInput';
import React from 'react';

export default function SloganPortfolio() {
  const [userSlogan, onSloganChange] = useInput('');
  const [userPortfolio, onPortfolioChange] = useInput('');
  return (
    <>
      <input name="slogan" onChange={onSloganChange} value={userSlogan} placeholder="slogan" />
      <input
        name="portfolio"
        onChange={onPortfolioChange}
        value={userPortfolio}
        placeholder="포트폴리오"
      />
    </>
  );
}
