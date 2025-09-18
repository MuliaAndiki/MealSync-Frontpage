'use client';
import ForgotPasswordHeroSection from '@/components/section/auth/forgotPassword-section';
import Container from '@/components/ui/container';

const ForgotPasswordContainer = () => {
  return (
    <Container className="w-full min-h-screen flex flex-col">
      <ForgotPasswordHeroSection />
    </Container>
  );
};

export default ForgotPasswordContainer;
