import { GalleryVerticalEnd } from 'lucide-react';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import Form from '@/components/ui/form';
import { cn } from '@/utils/classname';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const VerifyOtpSection = ({ className, ...props }: React.ComponentProps<'div'>) => {
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
            <Link href="#" className="flex flex-col items-center gap-2 font-medium">
              <Box className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </Box>
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">Verify Otp </h1>
          </Box>
          <Box className="flex flex-col gap-6">
            <Box className="flex justify-center items-center">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Box>
            <Button className="w-full">Verify</Button>
          </Box>
        </Box>
      </Form>
      <Box className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </Box>
    </View>
  );
};

export default VerifyOtpSection;
