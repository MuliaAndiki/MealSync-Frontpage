'use client';
import RegisterSection from '@/components/section/auth/register-section';
import Container from '@/components/ui/container';
import View from '@/components/ui/view';
import Box from '@/components/ui/box';
import { useState } from 'react';
import { FormRegisterType } from '@/types/form';
import { useAlert } from '@/hooks/useAlert/costum-alert';
import { useRegister } from '@/hooks/mutation/auth/mutation';

const RegisterContainer = () => {
  const alert = useAlert();
  const [formRegister, setFormRegister] = useState<FormRegisterType>({
    email: '',
    fullName: '',
    password: '',
  });

  const register = useRegister();
  const handleRegister = () => {
    console.log(formRegister);
    if (!formRegister.email || !formRegister.fullName || !formRegister.password) {
      alert.toast({
        title: 'Warning',
        message: 'Pleases Check Form',
        icon: 'warning',
      });
      return;
    }
    register.mutate(formRegister);
  };

  return (
    <Container className={`w-full min-h-screen flex flex-col `}>
      <View className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <Box className="w-full max-w-sm md:max-w-3xl">
          <RegisterSection
            formRegister={formRegister}
            setFormRegister={setFormRegister}
            onRegister={() => handleRegister()}
            isPending={register.isPending}
          />
        </Box>
      </View>
    </Container>
  );
};

export default RegisterContainer;
