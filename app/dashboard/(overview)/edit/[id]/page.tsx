"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchIntervenantById } from '@/app/lib/data';
import Form from '@/app/ui/intervenants/edit-form';
import Breadcrumbs from '@/app/ui/intervenants/breadcrumbs';
import { Intervenants } from '@/app/lib/definitions'; // Importer 

const EditPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [intervenant, setIntervenant] = useState<Intervenants | null>(null); // Remplacer `any` par `Intervenants`
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id || typeof id !== 'string') {
        setMessage('Paramètre ID manquant ou invalide');
        return;
      }

      const intervenantData = await fetchIntervenantById(id);
      if (!intervenantData) {
        setMessage('Intervenant non trouvé');
        return;
      }

      setIntervenant(intervenantData);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (message) {
    return <div>{message}</div>;
  }

  if (!intervenant) {
    return <div>Chargement...</div>;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Intervenants', href: '/dashboard/' },
          { label: 'Edit', href: '' },
          { label: intervenant.firstname, href: `/dashboard/edit/${id}`, active: true },
        ]}
      />
      <Form intervenant={intervenant} />
    </main>
  );
};

export default EditPage;
