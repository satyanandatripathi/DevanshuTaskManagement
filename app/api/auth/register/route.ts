import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const passwordHash = await hash(password, 10);
    const id = uuidv4();

    await db.insert(users).values({
      id,
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    });

    const session = await encrypt({ user: { id, name, email, role: 'member' } });
    const cookieStore = await cookies();
    cookieStore.set('session', session, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
