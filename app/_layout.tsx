import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { AiProvider } from '@/app/context/ai-context';
import FloatingMenu from '@/components/floating-menu';

export const unstable_settings = {
  anchor: '(tabs)',
};

// 1. Custom Paper Theme (Matching your Gold/Teal/Dark aesthetic)
const customPaperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#00d2ff',
    secondary: '#FFD700',
    background: '#0F2027', // Your deep gradient base
    surface: 'rgba(255, 255, 255, 0.05)',
  },
};

// 2. Custom Navigation Theme
const customNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0F2027',
    card: '#0F2027',
    text: '#ffffff',
    border: 'rgba(255, 255, 255, 0.1)',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={customPaperTheme}>
      <AiProvider>
        <ThemeProvider value={customNavTheme}>
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: '#0F2027' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: '800' },
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              
              {/* Specialized Modal Styling */}
              <Stack.Screen 
                name="results" 
                options={{ 
                  title: 'AI Intelligence',
                  headerShown: true,
                  headerBackTitle: 'Back'
                }} 
              />
              
              <Stack.Screen 
                name="modal" 
                options={{ 
                  presentation: 'modal', 
                  title: 'System Settings',
                  headerStyle: { backgroundColor: '#1c252a' } 
                }} 
              />
            </Stack>
         
            {/* Force light status bar for your dark theme */}
            <StatusBar style="light" translucent />
          </View>
        </ThemeProvider>
      </AiProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2027',
  },
});