import type { Preview } from '@storybook/react-vite';
import '../src/styles/components.css';
import { ThemeProvider } from '../src/shared/contexts/ThemeContext';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1b1c1e',
        },
      ],
    },
  },
  decorators: [
    (Story: React.ComponentType) => {
      return React.createElement(
        ThemeProvider,
        null,
        React.createElement(
          'div',
          {
            className:
              'min-h-screen bg-[var(--color-semantic-background-normal-normal)] transition-colors',
          },
          React.createElement(Story),
        ),
      );
    },
  ],
};

export default preview;
