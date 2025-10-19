import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CustomInput, CustomInputProps } from './CustomInput';

export interface PasswordInputProps extends Omit<CustomInputProps, 'secureTextEntry' | 'rightIcon'> {
  label?: string;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  placeholder = 'Enter your password',
  value,
  onChangeText,
  onBlur,
  error,
  containerClassName = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      error={error}
      secureTextEntry={!showPassword}
      autoCapitalize="none"
      autoComplete="password"
      containerClassName={containerClassName}
      rightIcon={
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="p-1"
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#9E9047"
          />
        </TouchableOpacity>
      }
      {...props}
    />
  );
};
