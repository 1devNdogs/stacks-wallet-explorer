import React from 'react';
import { Box, Flex, FlexProps } from '@stacks/ui';

export const Footer = React.memo(({ fullWidth, ...props }: FlexProps & { fullWidth?: boolean }) => {
  return (
    <Box width="100%" {...props}>
      <Flex
        pt="base"
        flexDirection={['column', 'column', 'row']}
        alignItems={['center', 'center', 'unset']}
        textAlign={['center', 'center', 'unset']}
        borderTop="1px solid var(--colors-border)"
        px={fullWidth ? ['base', 'base', 'extra-loose'] : 'unset'}
      >
        <Flex ml={['unset', 'unset', 'auto']}>
          <a href="https://github.com/1devNdogs">Github</a>
        </Flex>
      </Flex>
    </Box>
  );
});
