'use client';
import LoginSection from '@/components/section/auth/login-section';
import Container from '@/components/ui/container';
import View from '@/components/ui/view';
import Box from '@/components/ui/box';
import { useState } from 'react';
import { FormLoginType } from '@/types/form';
import useLogin from '@/hooks/mutation/auth/useLogin';
import { useAlert } from '@/hooks/useAlert/costum-alert';

const LoginContainer = () => {
  const alert = useAlert();
  const [formLogin, setFormLogin] = useState<FormLoginType>({
    email: '',
    password: '',
  });

  const login = useLogin();

  const handleLogin = () => {
    if (!formLogin.email || !formLogin.password) {
      alert.toast({
        title: 'Warning',
        message: 'Pleases Check Form',
        icon: 'warning',
      });
      return;
    }
    return login.mutate(formLogin);
  };
  return (
    <Container className={`w-full min-h-screen flex flex-col`}>
      <View className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <Box className="w-full max-w-sm md:max-w-3xl">
          <LoginSection
            formLogin={formLogin}
            setFormLogin={setFormLogin}
            onLogin={() => handleLogin()}
            isPending={login.isPending}
          />
        </Box>
      </View>
    </Container>
  );
};

export default LoginContainer;
