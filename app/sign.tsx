import { Alert, AlertVariant, CustomInput, Divider, Logo, PasswordInput, PrimaryButton, SocialButton, TextLink } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  AppState,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from 'zod';

// Tells Supabase Auth to continuously refresh the session automatically
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

// Schemas de validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
});

const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const SignScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    variant: 'info',
  });

  // Check if user is already logged in
  React.useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/(tabs)/home');
      }
    };
    checkSession();
  }, []);

  // Form pour Login
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form pour Signup
  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const showAlertFun = (title: string, message: string, variant: 'success' | 'danger' | 'info') => {
    setAlertConfig({ title, message, variant });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Soumission Login
  const onLoginSubmit = async ({ email, password }: LoginFormData) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      showAlertFun('Success!', 'You have been logged in successfully', 'success');
      router.replace('/(tabs)/home');
      
    } catch {
      showAlertFun('Error', 'Invalid email or password', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Soumission Signup
  const onSignupSubmit = async ({ email, password, firstName, lastName, phoneNumber }: SignupFormData) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
          },
        },
      });

      if (error) throw error;

      showAlertFun('Success!', 'Account created successfully! Please check your email.', 'success');

      // Switch to login tab after successful signup
      setTimeout(() => {
        setActiveTab('login');
      }, 2000);
    } catch (error: any) {
      showAlertFun('Error', error?.message || 'Failed to create account', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    console.log('Google auth');
    showAlertFun('Info', 'Google authentication not implemented yet', 'info');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >

          <Logo
            size={96}
            icon="restaurant"
          />

          {/* Alert */}
          {showAlert && (
            <View className="px-4 mb-4">
              <Alert
                title={alertConfig.title}
                message={alertConfig.message}
                variant={alertConfig.variant as AlertVariant}
                onClose={() => setShowAlert(false)}
              />
            </View>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <View className="px-4 max-w-[480px] w-full">
              <Controller
                control={loginForm.control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    error={loginForm.formState.errors.email?.message}
                  />
                )}
              />

              <Controller
                control={loginForm.control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={loginForm.formState.errors.password?.message}
                  />
                )}
              />

              {/* <View className="flex-row items-center justify-between mb-6">
                <Checkbox
                  checked={rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                  label="Remember me"
                />

                <TextLink
                  linkText="Forgot Password?"
                  onPress={handleForgotPassword}
                  containerClassName="py-0"
                  linkClassName="text-subtext-light underline"
                />
              </View> */}

              <PrimaryButton
                title="Login"
                onPress={loginForm.handleSubmit(onLoginSubmit)}
                loading={loading}
                disabled={!loginForm.formState.isDirty || !loginForm.formState.isValid}
                variant="primary"
                size="medium"
              />

              <Divider text="Or continue with" />

              <SocialButton
                title="Continue with Google"
                icon="https://lh3.googleusercontent.com/aida-public/AB6AXuAj99-zcTxvJLDrN5XYgiuSfgPVSfxKsCvRBWJeSKLYAXC1_r1IwqFhDNfxxKMskQoAOqsTf2oDHa3Hal5KCYmQ42z3L1FMcM-r7ytGA2axXLugamCTWE4ajtrkpEL28HukePeW48hRBUSdmW9Iks3Na3TCgS_44z8_gND9A2ZN1YwBrj1voyxTr-UZAYKi5VGQgf0k_FApnJDlvZUOzUnJk1DJRxcj5XQIcaqBwEDJcOw8iJa78L0o8Sl4N8dXsViFh2npUbiKbFI"
                onPress={handleGoogleAuth}
              />

              {/* Switch to Sign Up Link */}
              <TextLink
                text="Don't have an account?"
                linkText="Sign Up"
                onPress={() => setActiveTab('signup')}
                containerClassName="py-6"
              />
            </View>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <View className="px-4 max-w-[480px] w-full">
              <Controller
                control={signupForm.control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="First Name"
                    placeholder="Enter your first name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    autoComplete="name-given"
                    error={signupForm.formState.errors.firstName?.message}
                  />
                )}
              />

              <Controller
                control={signupForm.control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    autoComplete="name-family"
                    error={signupForm.formState.errors.lastName?.message}
                  />
                )}
              />

              <Controller
                control={signupForm.control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    error={signupForm.formState.errors.email?.message}
                  />
                )}
              />

              <Controller
                control={signupForm.control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    error={signupForm.formState.errors.phoneNumber?.message}
                  />
                )}
              />

              <Controller
                control={signupForm.control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={signupForm.formState.errors.password?.message}
                  />
                )}
              />

              <PrimaryButton
                title="Sign Up"
                onPress={signupForm.handleSubmit(onSignupSubmit)}
                loading={loading}
                disabled={!signupForm.formState.isDirty || !signupForm.formState.isValid}
                variant="primary"
                size="medium"
                containerClassName="mt-2"
              />

              <Divider text="Or continue with" />

              <SocialButton
                title="Continue with Google"
                icon="https://lh3.googleusercontent.com/aida-public/AB6AXuAj99-zcTxvJLDrN5XYgiuSfgPVSfxKsCvRBWJeSKLYAXC1_r1IwqFhDNfxxKMskQoAOqsTf2oDHa3Hal5KCYmQ42z3L1FMcM-r7ytGA2axXLugamCTWE4ajtrkpEL28HukePeW48hRBUSdmW9Iks3Na3TCgS_44z8_gND9A2ZN1YwBrj1voyxTr-UZAYKi5VGQgf0k_FApnJDlvZUOzUnJk1DJRxcj5XQIcaqBwEDJcOw8iJa78L0o8Sl4N8dXsViFh2npUbiKbFI"
                onPress={handleGoogleAuth}
              />

              {/* Switch to Login Link */}
              <TextLink
                text="Already have an account?"
                linkText="Login"
                onPress={() => setActiveTab('login')}
                containerClassName="py-6"
              />
            </View>
          )}

          <View className="pb-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignScreen;
