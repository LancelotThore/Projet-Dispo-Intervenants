"use client"

import { Suspense } from 'react';
import Pagination from '@/app/ui/intervenants/pagination';
import Table from '@/app/ui/intervenants/table';
import { IntervenantsTableSkeleton } from '@/app/ui/skeletons';

export default function Intervenants() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <h1>Gestion des Intervenants :</h1>
            <Suspense fallback={<IntervenantsTableSkeleton />}>
                <Table />
            </Suspense>
            {/* <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div> */}
        </main>
    );
}