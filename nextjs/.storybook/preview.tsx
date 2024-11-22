import type { Preview } from "@storybook/react";
import React from 'react';
import { Open_Sans } from "next/font/google";
import '../app/globals.css';

const font = Open_Sans({ subsets: ["latin"] });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      React.createElement('div', { className: font.className },
        React.createElement(Story)
      )
    ),
  ],
};

export default preview;
