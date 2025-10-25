import "@/global.css";
import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider, ColorSchemeProvider } from '@/contexts';
import { View } from 'react-native';
import { useTranslation } from '@/hooks';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

/**
 * RTLWrapper - Applique le RTL dynamiquement à toute l'application
 */
function RTLWrapper({ children }: { children: React.ReactNode }) {
  const { isRTL } = useTranslation();

  return (
    <View style={{ flex: 1, direction: isRTL ? 'rtl' : 'ltr' }}>
      {children}
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider>
        <LocalizationProvider>
          <SafeAreaProvider>
            <RTLWrapper>
              <Stack screenOptions={{ headerShown: false }} />
            </RTLWrapper>
          </SafeAreaProvider>
        </LocalizationProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}