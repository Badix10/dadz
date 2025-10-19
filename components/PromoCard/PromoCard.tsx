import React, { memo, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

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
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <View className="mx-4 mt-6 mb-6 bg-[#FFC700] rounded-2xl p-4 flex-row items-center shadow-lg">
      <Image
        source={{ uri: imageUrl }}
        className="w-24 h-24"
        resizeMode="contain"
        accessibilityLabel={`${title} promotional image`}
      />

      <View className="flex-1 ml-2">
        <Text className="text-lg font-bold text-black">{title}</Text>
        <Text className="text-sm text-black opacity-80 mb-3">
          {description}
        </Text>
        <TouchableOpacity
          className="bg-black px-4 py-2 rounded-lg self-start"
          onPress={handlePress}
          accessibilityLabel={buttonText}
          accessibilityRole="button"
        >
          <Text className="text-white text-sm font-semibold">{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

PromoCard.displayName = 'PromoCard';

export default PromoCard;
