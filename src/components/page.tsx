import React from 'react';
import { Box, Flex, FlexProps, color } from '@stacks/ui';
import { css, Theme } from '@stacks/ui-core';

import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Notice } from '@components/notice';
import { MetaverseBg } from '@components/metaverse-bg';

import {
  SITE_NOTICE_BANNER_LABEL,
  SITE_NOTICE_BANNER_MESSAGE,
  SITE_NOTICE_ENABLED,
} from '@common/constants';
import type { MempoolTransaction, Transaction } from '@stacks/stacks-blockchain-api-types';

type PageProps = {
  notice?: { label?: string; message?: string };
  fullWidth?: boolean;
  tx?: MempoolTransaction | Transaction;
} & FlexProps;

type PageWrapperProps = {
  fullWidth?: boolean;
  notice?: any;
  networkMode?: string;
} & FlexProps;

export const Page: React.FC<PageProps> = React.memo(({ children, fullWidth, ...rest }) => (
  <Flex
    css={(theme: Theme) =>
      css({
        '*::selection': {
          color: 'white',
          background: color('accent'),
          transition: 'all 0.12s ease-in-out',
        },
      })(theme)
    }
    flexDirection="column"
    width="100%"
    minHeight="100%"
    position="relative"
    zIndex={2}
    flexGrow={1}
  >
    {SITE_NOTICE_ENABLED && (
      <Box px="base-loose">
        <Notice label={SITE_NOTICE_BANNER_LABEL} message={SITE_NOTICE_BANNER_MESSAGE} />
      </Box>
    )}
    <Flex
      as="main"
      mx="auto"
      width="100%"
      flexGrow={1}
      height="100%"
      maxWidth={fullWidth ? '100%' : '1280px'}
      flexDirection="column"
      px={['base', 'base', 'extra-loose']}
      {...rest}
    >
      {children}
    </Flex>
    <Footer
      mx="auto"
      width="100%"
      maxWidth={fullWidth ? '100%' : '1280px'}
      mt={fullWidth ? 'unset' : 'extra-loose'}
      mb={['base', 'base', 'extra-loose']}
      px={fullWidth ? 'unset' : ['base', 'base', 'extra-loose']}
      fullWidth={fullWidth}
    />
  </Flex>
));

export const PageWrapper: React.FC<PageWrapperProps> = ({ networkMode, ...props }) => (
  <Flex
    maxWidth="100vw"
    overflowX="hidden"
    bg={color('bg')}
    flexDirection="column"
    minHeight="100vh"
    position="relative"
    overflow="hidden"
  >
    <Header fullWidth={true} />
    <Flex
      display={['block', 'block', 'none', 'none']}
      p="tight"
      mx="auto"
      width="100%"
      flexDirection={'column'}
      px={'base'}
    ></Flex>
    <Page {...props} />
    <MetaverseBg />
  </Flex>
);
