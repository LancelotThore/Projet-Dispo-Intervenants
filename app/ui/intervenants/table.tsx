"use client"

import { useEffect, useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import { NewKeyIntervenants, UpdateIntervenants, DeleteIntervenants } from '@/app/ui/intervenants/buttons';
import { CheckCircleIcon, ExclamationCircleIcon, KeyIcon } from '@/app/ui/icons';
import { Intervenants } from '@/app/lib/definitions';

export default function Table({ query, currentPage, itemsPerPage }: { query: string; currentPage: number; itemsPerPage: number }) {
    const [intervenants, setIntervenants] = useState<Intervenants[]>([]);
    const today = new Date();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/intervenants/get?query=${query}&page=${currentPage}&limit=${itemsPerPage}`);
            const result = await response.json();
            if (Array.isArray(result)) {
                setIntervenants(result);
            } else {
                setIntervenants([]);
            }
        };

        fetchData();
    }, [query, currentPage, itemsPerPage]);

    const refreshData = async () => {
        const response = await fetch(`/api/intervenants/get?query=${query}&page=${currentPage}&limit=${itemsPerPage}`);
        const result = await response.json();
        setIntervenants(result);
    };

    if (intervenants.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-6 flow-root overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-red-50 p-2 lg:pt-0">
                    <div className="lg:hidden">
                        {intervenants.map((intervenant) => (
                            <div
                                key={intervenant.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p>{intervenant.firstname} {intervenant.lastname}</p>
                                        <p className="text-sm text-gray-500">{intervenant.email}</p>
                                    </div>
                                    {new Date(intervenant.enddate) > today ? <CheckCircleIcon className="h-6 w-6 text-green-500" /> : <ExclamationCircleIcon className="h-6 w-6 text-red-500" />}
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <div className="flex gap-2"><KeyIcon className="w-4 text-gray-500"/><span>{intervenant.key}</span></div>
                                        <p><span className="text-sm text-gray-500">Creation:</span> {formatDateToLocal(intervenant.creationdate)}</p>
                                        <p><span className="text-sm text-gray-500">End Date:</span> {formatDateToLocal(intervenant.enddate)}</p>
                                        <p><span className="text-sm text-gray-500">Last Updated:</span> {formatDateToLocal(intervenant.last_modified)}</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <NewKeyIntervenants id={intervenant.id} onRegenerate={refreshData} />
                                        <UpdateIntervenants id={intervenant.id} />
                                        <DeleteIntervenants id={intervenant.id} onDelete={refreshData} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 lg:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium whitespace-nowrap"></th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 whitespace-nowrap">
                                    Firstname
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium whitespace-nowrap">
                                    Lastname
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium whitespace-nowrap">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium whitespace-nowrap">
                                    Key
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium whitespace-nowrap">
                                    Creation Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium whitespace-nowrap">
                                    End Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium whitespace-nowrap">
                                    Last Update
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3 whitespace-nowrap">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {intervenants.map((intervenant) => (
                                <tr
                                    key={intervenant.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {new Date(intervenant.enddate) > today ? <CheckCircleIcon className="h-6 w-6 text-green-500" /> : <ExclamationCircleIcon className="h-6 w-6 text-red-500" />}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {intervenant.firstname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {intervenant.lastname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {intervenant.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {intervenant.key}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(intervenant.creationdate)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(intervenant.enddate)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(intervenant.last_modified)}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <NewKeyIntervenants id={intervenant.id} onRegenerate={refreshData} />
                                            <UpdateIntervenants id={intervenant.id} />
                                            <DeleteIntervenants id={intervenant.id} onDelete={refreshData} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}