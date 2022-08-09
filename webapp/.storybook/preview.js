import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Styles from '../src/styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Styles>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </Styles>
  ),
];
