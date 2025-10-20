import "@/global.css";
import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider } from '@/contexts/LocalizationContext';
import { View } from 'react-native';
import { useTranslation } from '@/hooks';

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
    <LocalizationProvider>
      <SafeAreaProvider>
        <RTLWrapper>
          <Stack screenOptions={{ headerShown: false }} />
        </RTLWrapper>
      </SafeAreaProvider>
    </LocalizationProvider>
  );
}