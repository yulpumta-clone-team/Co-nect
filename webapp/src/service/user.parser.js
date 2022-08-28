/* eslint-disable no-prototype-builtins */

import { hopeSessionOption, jobOptions } from 'constant';

export const userCardParser = (userCardInfo) => {
  const job = userCardInfo.job || jobOptions[0].value;
  const hopeSession = userCardInfo.hopeSession || hopeSessionOption[0].value;
  return {
    ...userCardInfo,
    job,
    hopeSession,
  };
};
