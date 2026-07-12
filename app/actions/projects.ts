'use server';

import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  const id = uuidv4();

  await db.insert(projects).values({
    id,
    name,
    description,
    status: 'active',
    createdBy: session.user.id,
    createdAt: new Date(),
  });

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}
