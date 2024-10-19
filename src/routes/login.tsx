import { useSubmission, type RouteSectionProps } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';
import { loginOrRegister } from '~/api/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import LoginForm from '~/components/auth/login-form';
import RegisterForm from '~/components/auth/register-form';

export default function Login(props: RouteSectionProps) {
  const [showPassword, setShowPassword] = createSignal(false);

  return (
    <div class="min-h-screen flex items-center justify-center">
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle class="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription class="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" class="w-full">
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm
                setShowPassword={setShowPassword}
                showPassword={showPassword()}
              />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm
                setShowPassword={setShowPassword}
                showPassword={showPassword()}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
