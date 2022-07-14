import React from 'react';

export default function nickname() {
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
