import { action, cache, redirect } from '@solidjs/router';
import {
  getSession,
  login,
  register,
  validatePassword,
  validateUsername,
} from './session';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { userTable } from '../../drizzle/schema';

export const getUser = cache(async () => {
  'use server';
  const session = await getSession();
  const userId = session.data.userId;
  if (userId === undefined) throw redirect('/login');

  try {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId))
      .get();

    if (!user) throw redirect('/login');
    return { id: user.id, username: user.username };
  } catch {
    throw logout();
  }
}, 'user');

export const loginOrRegister = action(async (formData: FormData) => {
  'use server';
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  const loginType = String(formData.get('intent'));
  let error = validateUsername(username) || validatePassword(password);
  if (error) return new Error(error);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const user = await (loginType !== 'login'
      ? register(username, password)
      : login(username, password));
    const session = await getSession();
    await session.update((d) => {
      d.userId = user.id;
      return d;
    });
    return redirect('/');
  } catch (err) {
    return err as Error;
  }
}, 'loginOrRegister');

export const logout = action(async () => {
  'use server';
  const session = await getSession();
  await session.update((d) => (d.userId = undefined));
  throw redirect('/login');
}, 'logout');
