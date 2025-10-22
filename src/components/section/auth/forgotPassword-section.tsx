import { GalleryVerticalEnd } from 'lucide-react';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import Form from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import View from '@/components/ui/view';
import { FormForgotPassword } from '@/types/form';

interface ForgotPasswordProps {
  formForgotPassword: FormForgotPassword;
  setFormForgotPassword: React.Dispatch<React.SetStateAction<FormForgotPassword>>;
  onForgot: () => void;
}

const ForgotPasswordHeroSection: React.FC<ForgotPasswordProps> = ({
  formForgotPassword,
  onForgot,
  setFormForgotPassword,
}) => {
  return (
    <View className="flex flex-col gap-6">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onForgot();
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
              <Label htmlFor="email">Email :</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formForgotPassword.email}
                required
                onChange={(e) =>
                  setFormForgotPassword((prev) => {
                    const newObj = { ...prev, email: e.target.value };
                    return newObj;
                  })
                }
              />
            </Box>
            <Button className="w-full" type="submit">
              Send
            </Button>
          </Box>
        </Box>
      </Form>
      <Box className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </Box>
    </View>
  );
};

export default ForgotPasswordHeroSection;
