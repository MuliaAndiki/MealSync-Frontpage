import { Label } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Form from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { FormLoginType } from '@/types/form';
import { cn } from '@/utils/classname';

interface LoginProps {
  formLogin: FormLoginType;
  setFormLogin: React.Dispatch<React.SetStateAction<FormLoginType>>;
  onLogin: () => void;
  isPending: boolean;
}

const LoginSection: React.FC<LoginProps> = ({ onLogin, setFormLogin, isPending }) => {
  return (
    <View className={cn('flex flex-col gap-6')}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Box className="p-6 md:p-8">
            <Box className="flex flex-col gap-6">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
                className="flex flex-col gap-6"
              >
                <Box className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Acme Inc account
                  </p>
                </Box>
                <Box className="grid gap-3">
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) =>
                      setFormLogin((prev) => {
                        const newObj = { ...prev, email: e.target.value };
                        return newObj;
                      })
                    }
                  />
                </Box>
                <Box className="grid gap-3">
                  <Box className="flex items-center">
                    <Label>Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </Box>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) =>
                      setFormLogin((prev) => {
                        const newObj = { ...prev, password: e.target.value };
                        return newObj;
                      })
                    }
                  />
                </Box>
                <Button className="w-full" disabled={isPending} variant={'native'}>
                  {isPending ? 'Loading' : 'Login'}
                </Button>
              </Form>

              <Box className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </Box>
              <Box className=" gap-4 w-full">
                <Button variant="outline" type="button" className="w-full ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </Box>
              <Box className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </Box>
            </Box>
          </Box>
          <Box className="bg-muted relative hidden md:block">
            <Image
              src="/images/about.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={100}
              height={100}
              loading="lazy"
            />
          </Box>
        </CardContent>
      </Card>
      <Box className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and
        <Link href="#">Privacy Policy</Link>.
      </Box>
    </View>
  );
};

export default LoginSection;
