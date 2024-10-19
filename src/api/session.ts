import { useSession } from 'vinxi/http';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { Users } from '../../drizzle/schema';

const sessionSecret =
  process.env.SESSION_SECRET ?? 'areallylongsecretthatyoushouldreplace';

type SessionData = {
  userId?: number;
};

export function getSession() {
  return useSession<SessionData>({
    password: sessionSecret,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  });
}

export async function login(username: string, password: string) {
  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.username, username))
    .get();

  if (!user || password !== user.password) throw new Error('Invalid login');

  return user;
}

export async function register(username: string, password: string) {
  const existingUser = await db
    .select()
    .from(Users)
    .where(eq(Users.username, username))
    .get();

  if (existingUser) throw new Error('User already exists');

  return db.insert(Users).values({ username, password }).returning().get();
}

export function validateUsername(username: unknown) {
  if (typeof username !== 'string' || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

export function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export async function getUserId() {
  const session = await getSession();
  const userId = session.data.userId;
}
