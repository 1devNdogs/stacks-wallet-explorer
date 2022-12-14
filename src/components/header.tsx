import { Box, BoxProps, Flex, FlexProps, IconButton } from '@stacks/ui';
import React from 'react';
import { StxInline } from '@components/icons/stx-inline';
import { ExplorerLink } from '@components/links';
import { WalletConnectButton } from './wallet-connect-button';

export const LogoNavItem = React.memo((props: BoxProps) => {
  return (
    <Box {...props}>
      <ExplorerLink path={'/'}>
        <IconButton
          invert
          size="42px"
          iconSize="24px"
          icon={StxInline}
          color="white"
          flexShrink={0}
          aria-label="Homepage"
          title="Transaction Explorer"
          as="span"
        />
      </ExplorerLink>
    </Box>
  );
});

const HeaderBar: React.FC<FlexProps> = React.memo(props => (
  <Flex
    top={0}
    height="64px"
    alignItems="center"
    flexDirection="row"
    px={['base', 'base', 'extra-loose']}
    width="100%"
    position="relative"
    zIndex={99999}
    {...props}
  />
));

export const Header: React.FC<
  { isHome?: boolean; fullWidth?: boolean; networkMode?: string } & FlexProps
> = React.memo(({ isHome, fullWidth, networkMode, ...props }) => {
  return (
    <>
      <HeaderBar
        mx="auto"
        width="100%"
        maxWidth={isHome || fullWidth ? '100%' : '1280px'}
        justifyContent={isHome || fullWidth ? 'space-between' : 'unset'}
        {...props}
      >
        <LogoNavItem />

        <Flex
          mx={['none', 'none', 'auto']}
          width="100%"
          justifyContent={isHome || fullWidth ? 'space-between' : 'unset'}
          pl={['unset', 'unset', 'base-loose']}
          maxWidth={isHome || fullWidth ? 'unset' : '1280px'}
          alignItems="center"
        >
          <Flex alignItems="center" flexGrow={1}></Flex>
          <WalletConnectButton />
        </Flex>
      </HeaderBar>
    </>
  );
});
