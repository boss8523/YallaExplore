import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { GoogleSignInButton } from '@/components/google-signin-button';
import { Link, useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <View style={styles.logo}>
        <ThemedText type="title">🇦🇪</ThemedText>
      </View>
      <ThemedText type="title">UAE AI Travel Assistant</ThemedText>
      <ThemedText style={styles.subtitle}>Ask anything about traveling in UAE and get a planned itinerary with hotspots, tips and more.</ThemedText>

      <GoogleSignInButton onPress={() => router.replace('/(tabs)')} />

      <Link href="/(tabs)">
        <Link.Trigger>
          <ThemedText style={styles.link}>Continue without Google</ThemedText>
        </Link.Trigger>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#D4AF37', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  subtitle: { textAlign: 'center', marginVertical: 12 },
  link: { marginTop: 12, color: '#0B3D91' }
});