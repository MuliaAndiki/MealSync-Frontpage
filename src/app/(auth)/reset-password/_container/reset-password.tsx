'use client';

import ResetPasswordSection from '@/components/section/auth/resetPassword-section';
import Container from '@/components/ui/container';

const ResetPasswordContainer = () => {
  return (
    <Container className="flex flex-col w-full min-h-screen">
      <ResetPasswordSection />
    </Container>
  );
};

export default ResetPasswordContainer;
