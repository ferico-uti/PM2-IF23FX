import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DefaultTheme, PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    secondary: 'green',
  },
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    //     {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>

    <PaperProvider theme={theme}>
      {/* non aktifkan header */}
      <Stack screenOptions={{
        headerShown: false,        
      }}>        
      </Stack>
      <StatusBar barStyle={"light-content"} backgroundColor={"#a51c31"} />
    </PaperProvider>
  );
}
