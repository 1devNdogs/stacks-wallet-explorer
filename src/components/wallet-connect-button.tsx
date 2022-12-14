import { useAuth } from '@micro-stacks/react';
import { Button } from './button';

export const WalletConnectButton = () => {
  const { openAuthRequest, isRequestPending, signOut, isSignedIn } = useAuth();
  const label = isRequestPending ? 'Loading...' : isSignedIn ? 'Sign out' : 'Connect Stacks Wallet';
  return (
    <Button
      mr={'1em'}
      position="relative"
      zIndex={999}
      onClick={async () => {
        if (isSignedIn) await signOut();
        else await openAuthRequest();
      }}
    >
      {label}
    </Button>
  );
};
