import Container from '@/components/ui/container';
import BlankLayout from '@/core/layouts/blank.layout';
import Authproviders from '@/core/providers/auth.provider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="w-full">
      <Authproviders>
        <BlankLayout>{children}</BlankLayout>
      </Authproviders>
    </Container>
  );
}
