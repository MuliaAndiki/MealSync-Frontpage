'use client';

import Image from 'next/image';
import { useState } from 'react';

import ResetPasswordSection from '@/components/section/auth/resetPassword-section';
import Box from '@/components/ui/box';
import Container from '@/components/ui/container';
import { useAppSelector } from '@/hooks/dispatch/dispatch';
import { useResetPassword } from '@/hooks/mutation/auth/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormResetPassword } from '@/types/form';

const ResetPasswordContainer = () => {
  const reset = useResetPassword();
  const currentEmail = useAppSelector((state) => state.otp.email);
  const [formResetPassword, setFormResetPassword] = useState<FormResetPassword>({
    email: currentEmail,
    password: '',
  });

  const handleReset = () => {
    reset.mutate(formResetPassword);
  };
  return (
    <Container className="flex flex-col w-full min-h-screen">
      <Box className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Image alt="icon" src="/images/logo.svg" width={250} height={250} />
        <Image alt="bg" src="/images/about.svg" fill className="object-cover z-[-1]" />
        <Box className="w-full max-w-sm z-0">
          <ResetPasswordSection
            formResetPassword={formResetPassword}
            onReset={() => handleReset()}
            setFormResetPassword={setFormResetPassword}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordContainer;
