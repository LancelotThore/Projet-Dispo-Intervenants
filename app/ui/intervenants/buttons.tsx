import { PencilIcon, PlusIcon, TrashIcon } from '@/app/ui/icons';
import Link from 'next/link';
import { deleteIntervenants, createIntervenants } from '@/app/lib/actions';

export function CreateIntervenants() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-10 items-center rounded-lg bg-redunilim px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      <span className="hidden md:block">Create Intervenants</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateIntervenants({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteIntervenants({ id, onDelete }: { id: string, onDelete: () => void }) {
  const handleDelete = async () => {
    await deleteIntervenants(id);
    onDelete();
  };

  return (
    <button onClick={handleDelete} className="rounded-md border p-2 hover:bg-gray-100">
      <TrashIcon className="w-5" />
    </button>
  );
}