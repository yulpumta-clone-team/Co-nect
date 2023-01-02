import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import useComments from './useComments';

const CommentStateContext = createContext();
const CommentActionContext = createContext();

CommentProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function CommentProvider({ children }) {
  const [states, actions] = useComments();
  return (
    <CommentActionContext.Provider value={actions}>
      <CommentStateContext.Provider value={states}>{children}</CommentStateContext.Provider>
    </CommentActionContext.Provider>
  );
}

export function useCommentsState() {
  const value = useContext(CommentStateContext);
  if (value === undefined) {
    throw new Error('useCommentsState should be used within CommentProvider');
  }
  return value;
}

export function useCommentsAction() {
  const value = useContext(CommentActionContext);
  if (value === undefined) {
    throw new Error('useCommentsAction should be used within CommentProvider');
  }
  return value;
}
