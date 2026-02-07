import React from 'react';
import { Button } from 'react-native-paper';

export function GoogleSignInButton({ onPress }: { onPress?: () => void }) {
  return (
    <Button mode="contained" onPress={onPress} style={{ borderRadius: 999 }}>
      Sign in with Google
    </Button>
  );
}