import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleFillSvg from 'assets/icons/CheckCircleFillSvg';
import ExclamationCircleFillSvg from 'assets/icons/ExclamationCircleFillSvg';
import InfoCircleFillSvg from 'assets/icons/InfoCircleFillSvg';
import ExclamationTriangleFillSvg from 'assets/icons/ExclamationTriangleFillSvg';

MessageIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default function MessageIcon({ type }) {
  const Icon = MESSAGE_ICON[type];
  return <Icon />;
}
const MESSAGE_ICON = {
  Success: CheckCircleFillSvg,
  Error: ExclamationCircleFillSvg,
  Warning: ExclamationTriangleFillSvg,
  Info: InfoCircleFillSvg,
};
