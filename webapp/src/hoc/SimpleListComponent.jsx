import React from 'react';
import PropTypes from 'prop-types';

SimpleListComponent.propTypes = {
  Component: PropTypes.element.isRequired,
  idx: PropTypes.number.isRequired,
};
/**
 * 단순하게 UI적으로 반복되는 컴포넌트를 렌더링하는 hoc
 * @param {function} Component 반복할 컴포넌트
 * @param {number} idx 반복횟수
 */
export default function SimpleListComponent({ Component, idx }) {
  return Array(idx)
    .fill(0)
    .map((_, i) => <Component idx={i} />);
}
