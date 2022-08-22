import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

Slide.propTypes = {
  img: PropTypes.string.isRequired,
};

export default function Slide({ img }) {
  return <IMG src={img} />;
}

const IMG = styled.img`
  width: 52px;
  height: 85%;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px #cdcdcd;
`;
