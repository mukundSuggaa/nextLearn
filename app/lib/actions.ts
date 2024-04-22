'use server';
import { z } from 'zod';
import { db, VercelPoolClient } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const TodoFormSchema = z.object({
  id: z.string(),
  description: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateTodo = TodoFormSchema.omit({ id: true });

// Create INovice
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  await insertInvoiceData({ customerId, amountInCents, status, date });
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

async function insertInvoiceData({
  customerId,
  amountInCents,
  status,
  date,
}: {
  customerId: string;
  amountInCents: number;
  status: string;
  date: string;
}) {
  // to do remvoe below create connection
  const client = await db.connect();

  // await client.connect();
  await client.sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  client.release();
}

export async function createTodo(formaData: FormData) {
  try {
    const { description } = CreateTodo.parse({
      description: formaData.get('description'),
    });
    const client = await db.connect();
    await client.sql`INSERT INTO TODOS(description) VALUES(${description})`;
    client.release();
    // remove router cache
    revalidatePath('/dashboard/todos');
    // redirect('/dashboard');
  } catch (error) {
    console.log('[ERROR] In lib actions for creating todo', error);
  }
}
