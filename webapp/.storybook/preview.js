import React from 'react';
import ToastNotificationProvider from 'contexts/ToastNotification';
import Styles from 'styles';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

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
  mswDecorator,
  (Story) => (
    <Styles>
      <ToastNotificationProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ToastNotificationProvider>
    </Styles>
  ),
];
