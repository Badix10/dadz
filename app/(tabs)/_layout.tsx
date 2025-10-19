import BottomNavigation from '@/components/BottomNavigation';
import { NAVIGATION_TABS } from '@/constants';
import { Href, Tabs, usePathname, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Dérive l'onglet actif du pathname
  const activeTab = useMemo(() => {
    const routeName = pathname.split('/').pop() || 'home';
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
  }, [pathname]);

  const handleTabPress = useCallback(
    (tabName: string) => {
      const link = `/(tabs)/${tabName.toLowerCase()}`;
      router.navigate(link as Href);
    },
    [router]
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => (
        <BottomNavigation
          activeTab={activeTab}
          tabs={NAVIGATION_TABS}
          onTabPress={handleTabPress}
        />
      )}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="order" />
      <Tabs.Screen name="offer" />
      <Tabs.Screen name="chart" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}