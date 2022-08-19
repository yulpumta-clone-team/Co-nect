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
  width: 500px;
  height: 500px;
`;
