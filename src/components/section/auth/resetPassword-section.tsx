import { GalleryVerticalEnd } from 'lucide-react';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import Form from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import View from '@/components/ui/view';
import { FormResetPassword } from '@/types/form';

interface ResetPasswordProps {
  formResetPassword: FormResetPassword;
  setFormResetPassword: React.Dispatch<React.SetStateAction<FormResetPassword>>;
  onReset: () => void;
}

const ResetPasswordSection: React.FC<ResetPasswordProps> = ({ onReset, setFormResetPassword }) => {
  return (
    <View className="flex flex-col gap-6 ">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onReset();
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
            <h1 className="text-xl font-bold">Reset Password</h1>
          </Box>
          <Box className="flex flex-col gap-6">
            <Box className="grid gap-3">
              <Box className="grid gap-3">
                <Label htmlFor="new password">New Password</Label>
                <Input
                  id="password"
                  type="text"
                  required
                  onChange={(e) =>
                    setFormResetPassword((prev) => {
                      const newObj = { ...prev, password: e.target.value };
                      return newObj;
                    })
                  }
                />
              </Box>
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

export default ResetPasswordSection;
