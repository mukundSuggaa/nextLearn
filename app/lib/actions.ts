'use server';
import { z } from 'zod';
import { db, createClient } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  await insertInvoiceData({ customerId, amountInCents, status, date });
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
  const client = createClient({
    connectionString: process.env.POSTGRES_URL,
  });

  await client.connect();
  await client.sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  await client.end();
}
