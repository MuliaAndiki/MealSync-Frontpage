'use client';
import Image from 'next/image';
import { useState } from 'react';

import VerifyOtpSection from '@/components/section/auth/verifyOtp-section';
import Box from '@/components/ui/box';
import Container from '@/components/ui/container';
import { useAppSelector } from '@/hooks/dispatch/dispatch';
import { useVerify } from '@/hooks/mutation/auth/mutation';
import { FormVerifyOtp } from '@/types/form';

const VerifyOtpContainer = () => {
  const verify = useVerify();
  const currentEmail = useAppSelector((state) => state.otp.email);

  const [formVerifyOtp, setFormVerifyOtp] = useState<FormVerifyOtp>({
    email: currentEmail,
    otp: '',
  });
  const handleVerifyOtp = () => {
    verify.mutate(formVerifyOtp);
  };
  return (
    <Container className="flex flex-col w-full min-h-screen">
      <Box className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Image alt="icon" src="/images/logo.svg" width={250} height={250} />
        <Image alt="bg" src="/images/about.svg" fill className="object-cover z-[-1]" />
        <Box className="w-full max-w-sm z-0">
          <VerifyOtpSection
            formVerifyOtp={formVerifyOtp}
            setFormVerifyOtp={setFormVerifyOtp}
            onVerify={() => handleVerifyOtp()}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyOtpContainer;
