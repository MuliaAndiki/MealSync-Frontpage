import Container from '@/components/ui/container';
import BlankLayout from '@/core/layouts/blank.layout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="w-full">
      <BlankLayout>{children}</BlankLayout>
    </Container>
  );
}
