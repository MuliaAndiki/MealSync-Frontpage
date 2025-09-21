import { GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/utils/classname';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Form from '@/components/ui/form';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';

export function ForgotPasswordHeroSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <View className={cn('flex flex-col gap-6 ', className)} {...props}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-6 border p-4 rounded-lg bg-foreground/10"
      >
        <Box className="flex flex-col gap-6">
          <Box className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <Box className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </Box>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">FORGOT PASSWORD </h1>
          </Box>
          <Box className="flex flex-col gap-6">
            <Box className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </Box>
            <Button className="w-full">Reset</Button>
          </Box>
        </Box>
      </Form>
      <Box className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </Box>
    </View>
  );
}
