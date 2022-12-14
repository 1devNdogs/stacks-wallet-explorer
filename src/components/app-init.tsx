// @ts-nocheck
import React from 'react';
import { ColorModeProvider, ThemeProvider } from '@stacks/ui';
import { PageWrapper } from '@components/page';

export const AppWrapper = React.memo(props => (
  <ThemeProvider>
    <ColorModeProvider defaultMode="dark">
      <PageWrapper {...props} />
    </ColorModeProvider>
  </ThemeProvider>
));
