'use client';

import { useEffect, useState } from 'react';
import { fetchIntervenantsKey } from '@/app/lib/data';
import { checkAvailabilityAndWorkweek } from '@/app/lib/actions';
import Calendar from '@/app/ui/calendar';

// Définir un type pour les intervenants
interface Intervenant {
  key: string;
  firstname: string;
  lastname: string;
  last_modified?: string;
  availability?: Record<string, { start_time: string; end_time: string }[]>; // Type pour availability
}

export default function Disponibility() {
  const [intervenants, setIntervenants] = useState<Intervenant[]>([]);
  const [selectedIntervenant, setSelectedIntervenant] = useState<Intervenant | null>(null);
  const [missingWeeks, setMissingWeeks] = useState<string[]>([]);
  const [insufficientHours, setInsufficientHours] = useState<{ week: string; totalHours: number; requiredHours: number }[]>([]);

  useEffect(() => {
    async function loadIntervenants() {
      try {
        const data = await fetchIntervenantsKey();
        setIntervenants(data);
      } catch (err) {
        console.error('Erreur lors du chargement des intervenants', err);
      }
    }
    loadIntervenants();
  }, []);

  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value;
    const intervenant = intervenants.find(i => i.key === selectedKey) || null;
    setSelectedIntervenant(intervenant);

    if (intervenant) {
      try {
        const { missingWeeks, insufficientHours } = await checkAvailabilityAndWorkweek(selectedKey);
        setMissingWeeks(missingWeeks);
        setInsufficientHours(insufficientHours);
      } catch (err) {
        console.error('Erreur lors de la vérification des disponibilités et des heures de travail', err);
      }
    }
  };

  // Fonction pour transformer l'availability dans le bon format
  const formatAvailability = (availability: Record<string, { start_time: string; end_time: string }[]>): Record<string, { days: string; from: string; to: string }[]> => {
    return Object.keys(availability).reduce((acc, day) => {
      acc[day] = availability[day].map(timeSlot => ({
        days: day,  // Jour de la semaine
        from: timeSlot.start_time,  // Heure de début
        to: timeSlot.end_time  // Heure de fin
      }));
      return acc;
    }, {} as Record<string, { days: string; from: string; to: string }[]>);
  };

  return (
    <div className="container m-auto my-8">
      <select
        className="rounded-lg bg-redunilim p-4 text-sm font-medium text-white transition-colors hover:bg-red-500 appearance-none"
        name="intervenantSelect"
        id="intervenantSelect"
        onChange={handleSelectChange}
      >
        <option value="">Sélectionnez un intervenant</option>
        {intervenants.map(intervenant => (
          <option key={intervenant.key} value={intervenant.key}>
            {intervenant.firstname} {intervenant.lastname}
          </option>
        ))}
      </select>

      {selectedIntervenant && (
        <>
          <h1 className="text-center text-4xl mb-8">
            Disponibilités de {selectedIntervenant.firstname} {selectedIntervenant.lastname}
          </h1>
          {selectedIntervenant.last_modified && (
            <div className="text-center text-gray-600 mb-4">
              Dernière modification: {new Date(selectedIntervenant.last_modified).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Paris" })}
            </div>
          )}
          {missingWeeks.length > 0 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              <strong className="font-bold">Attention!</strong>
              <span className="block sm:inline"> Les disponibilités pour les semaines: {missingWeeks.join(', ')} sont manquantes</span>
            </div>
          )}
          {insufficientHours.length > 0 && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <strong className="font-bold">Attention!</strong>
              <span className="block sm:inline"> Vous avez saisi moins d&apos;heures que nécessaire pour les semaines suivantes:</span>
              <ul className="list-disc list-inside">
                {insufficientHours.map(({ week, totalHours, requiredHours }) => (
                  <li key={week}>Semaine {week}: {totalHours} heures saisies, {requiredHours} heures requises</li>
                ))}
              </ul>
            </div>
          )}
          <Calendar
            key={selectedIntervenant.key}
            availability={selectedIntervenant.availability ? formatAvailability(selectedIntervenant.availability) : {}}
            intervenantKey={selectedIntervenant.key}
          />
        </>
      )}
    </div>
  );
};
