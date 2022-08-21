import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import useEssentialForm from './useEssentialForm';

const EssentialFormStateContext = createContext();
const EssentialFormActionContext = createContext();

EssentialFormProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function EssentialFormProvider({ children }) {
  const [states, actions] = useEssentialForm();
  return (
    <EssentialFormActionContext.Provider value={actions}>
      <EssentialFormStateContext.Provider value={states}>
        {children}
      </EssentialFormStateContext.Provider>
    </EssentialFormActionContext.Provider>
  );
}

export function useEssentialFormsState() {
  const value = useContext(EssentialFormStateContext);
  if (value === undefined) {
    throw new Error('useEssentialFormsState should be used within EssentialFormProvider');
  }
  return value;
}

export function useEssentialFormsAction() {
  const value = useContext(EssentialFormActionContext);
  if (value === undefined) {
    throw new Error('useEssentialFormsAction should be used within EssentialFormProvider');
  }
  return value;
}
