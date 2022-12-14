import React from 'react';
import { Stack, color, Box, StackProps } from '@stacks/ui';
import { IconArrowRight } from '@tabler/icons';
import { Caption } from '@components/typography';
import { truncateMiddle } from '@common/utils';

interface SenderRecipientProps extends StackProps {
  sender: string;
  recipient: string;
}

export const SenderRecipient: React.FC<SenderRecipientProps> = React.memo(
  ({ sender, recipient, ...rest }) => (
    <Stack isInline spacing="extra-tight" {...{ as: 'span', ...rest }}>
      <Caption display="inline-block">{truncateMiddle(sender)}</Caption>
      <Box
        as={IconArrowRight}
        display="inline-block"
        size="15px"
        strokeWidth="1.5"
        color={color('text-caption')}
      />
      <Caption display="inline-block">{truncateMiddle(recipient)}</Caption>
    </Stack>
  )
);
