'use client';
import { ForgotPasswordHeroSection } from '@/components/section/auth/forgotPassword-section';
import Container from '@/components/ui/container';
import Image from 'next/image';
import Box from '@/components/ui/box';

const ForgotPasswordContainer = () => {
  return (
    <Container className="w-full min-h-screen flex flex-col">
      <Box className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Image alt="icon" src="/images/logo.svg" width={250} height={250} />
        <Image alt="bg" src="/images/about.svg" fill className="object-cover z-[-1]" />
        <Box className="w-full max-w-sm z-0">
          <ForgotPasswordHeroSection />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordContainer;
