import React from 'react';
import { Box, color, Flex } from '@stacks/ui';
import { SectionTitle, Title } from '@components/typography';
import { Meta } from '@components/meta-head';
import { TxsListWithTabsMemoized } from '@modules/TransactionList/components/TxsListWithTabsMemoized';
import { DEFAULT_LIST_LIMIT } from '@common/constants';
import { useAccount } from '@micro-stacks/react';

import type { GetServerSidePropsContext, NextPage } from 'next';
import { Section } from '@components/section';
import { Card } from '@components/card';
import { getDehydratedStateFromSession } from '../common/session-helpers';
import { PrincipalLink } from '@components/transaction-item';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      dehydratedState: await getDehydratedStateFromSession(ctx),
    },
  };
}

const Home: NextPage = () => {
  const { stxAddress } = useAccount();
  return (
    <main>
      <Meta title="Recent transactions" />
      <Box mb="base-loose">
        <>
          <Card
            bg={color('bg')}
            boxShadow="low"
            mb="0.5rem"
            display={'grid'}
            gridTemplateColumns={['1fr 2fr']}
          >
            <Title fontSize="20px" textAlign={['center', 'left']} m="1rem">
              Transaction Explorer
            </Title>
            {stxAddress ? (
              <Title fontSize="16px" textAlign={['end']} m="1rem">
                <PrincipalLink principal={stxAddress} textAlign={['end']} />
              </Title>
            ) : (
              <Title fontSize="16px" textAlign={['end']} m="1rem">
                {'Disconnected'}
              </Title>
            )}
          </Card>

          {stxAddress && <TxsListWithTabsMemoized infinite limit={DEFAULT_LIST_LIMIT} />}
        </>

        {!stxAddress && (
          <Section m={'4em'} alignSelf="flex-start">
            <Flex flexGrow={1} flexDirection="column" px="base-loose">
              <SectionTitle m="4em">
                Yooo, please connect your wallet to load your transaction history
              </SectionTitle>
            </Flex>
          </Section>
        )}
      </Box>
    </main>
  );
};

export default Home;
