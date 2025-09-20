import Container from '@/components/ui/container';
import NotFound from '@/core/components/not-found';
import BlankLayout from '@/core/layouts/blank.layout';

const NotFoundPage = async () => {
  return (
    <Container className="w-full">
      <BlankLayout>
        <NotFound />
      </BlankLayout>
    </Container>
  );
};

export default NotFoundPage;
