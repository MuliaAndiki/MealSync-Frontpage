'use client';
import VerifyOtpSection from '@/components/section/auth/verifyOtp-section';
import Container from '@/components/ui/container';

const VerifyOtpContainer = () => {
  return (
    <Container className="flex flex-col w-full min-h-screen">
      <VerifyOtpSection />
    </Container>
  );
};

export default VerifyOtpContainer;
