'use server';

import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function createTask(projectId: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;

  const id = uuidv4();

  await db.insert(tasks).values({
    id,
    projectId,
    title,
    description,
    priority,
    status: 'to_do',
    createdBy: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/dashboard`);
  revalidatePath(`/dashboard/tasks`);
}

export async function updateTaskStatus(taskId: string, projectId: string, status: string) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  await db.update(tasks).set({ status, updatedAt: new Date() }).where(eq(tasks.id, taskId));
  
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/dashboard/tasks`);
  revalidatePath(`/dashboard`);
}
