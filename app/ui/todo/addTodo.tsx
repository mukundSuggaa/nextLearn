import Link from 'next/link';
import { Button } from '../button';
import { createTodo } from '@/app/lib/actions';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
export async function AddTodo() {
  return (
    <form action={createTodo}>
      {/* Todod description */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Write a todo
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter Description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Todo</Button>
      </div>
    </form>
  );
}
