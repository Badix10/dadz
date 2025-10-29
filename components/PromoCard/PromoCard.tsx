import React, { memo, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface PromoCardProps {
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  onPress?: () => void;
}

/**
 * PromoCard component for displaying promotional offers
 * Memoized for performance optimization
 */
const PromoCard: React.FC<PromoCardProps> = memo(({
  imageUrl,
  title,
  description,
  buttonText,
  onPress,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <View className="mx-4 mt-6 mb-4">
      <View className="bg-primary rounded-[24px] p-5 flex-row items-center shadow-lg">
        <View className="bg-white rounded-2xl p-3 mr-4">
          <Image
            source={{ uri: imageUrl }}
            className="w-16 h-16"
            resizeMode="contain"
            accessibilityLabel={`${title} promotional image`}
          />
        </View>

        <View className="flex-1">
          <Text className="text-2xl font-extrabold text-black mb-1">{title}</Text>
          <Text className="text-sm text-black/70 mb-3">
            {description}
          </Text>
          <TouchableOpacity
            className="bg-black px-5 py-2.5 rounded-full self-start"
            onPress={handlePress}
            accessibilityLabel={buttonText}
            accessibilityRole="button"
          >
            <Text className="text-white text-sm font-bold">{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

PromoCard.displayName = 'PromoCard';

export default PromoCard;
