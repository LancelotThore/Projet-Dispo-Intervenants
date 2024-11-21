import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-8 bg-gray-100">
      <div className="mt-6 flex grow flex-col gap-6 md:flex-row">
        <div className="flex flex-col justify-center gap-8 rounded-lg bg-white shadow-lg px-8 py-12 md:w-2/5 md:px-24">
          <div className="antialiased text-2xl text-gray-900 md:text-4xl md:leading-relaxed">
            <p>418 dans le créateur de disponibilité</p>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-6 self-start rounded-lg bg-red-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-red-500 md:text-lg">
            <span>Log in</span> <ArrowRightIcon className="w-6 md:w-7" />
          </Link>
        </div>
      </div>
    </main>
  );
}