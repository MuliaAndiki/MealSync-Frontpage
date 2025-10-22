'use client';
import Image from 'next/image';
import { useState } from 'react';

import ForgotPasswordHeroSection from '@/components/section/auth/forgotPassword-section';
import Box from '@/components/ui/box';
import Container from '@/components/ui/container';
import { useForgorPassword } from '@/hooks/mutation/auth/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormForgotPassword } from '@/types/form';

const ForgotPasswordContainer = () => {
  const { alert } = useAppNameSpase();
  const forgot = useForgorPassword();

  const [formForgotPassword, setFormForgotPassword] = useState<FormForgotPassword>({
    email: '',
  });

  const handleForgot = () => {
    if (!formForgotPassword.email) {
      alert.toast({
        title: 'Warning',
        message: 'Email Is Required',
      });
      return;
    }
    forgot.mutate(formForgotPassword);
  };
  return (
    <Container className="w-full min-h-screen flex flex-col">
      <Box className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Image alt="icon" src="/images/logo.svg" width={250} height={250} />
        <Image alt="bg" src="/images/about.svg" fill className="object-cover z-[-1]" />
        <Box className="w-full max-w-sm z-0">
          <ForgotPasswordHeroSection
            formForgotPassword={formForgotPassword}
            setFormForgotPassword={setFormForgotPassword}
            onForgot={() => handleForgot()}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordContainer;
