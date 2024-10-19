import { createAsync, type RouteDefinition } from '@solidjs/router';
import { LogOutIcon } from 'lucide-solid';
import { getUser, logout } from '~/api/auth';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export const route = {
  preload() {
    getUser();
  },
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(async () => getUser(), { deferStream: true });
  return (
    <div class="min-h-screen flex items-center justify-center">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <CardTitle class="text-2xl font-bold text-center">
            Welcome, {user()?.username}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-center text-gray-600 mb-4">
            We're glad to see you here. Enjoy your stay!
          </p>
        </CardContent>
        <CardFooter>
          <form method="post" action={logout} class="w-full">
            <Button class="w-full" variant="outline" type="submit">
              <LogOutIcon class="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
