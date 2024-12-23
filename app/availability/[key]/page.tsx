import { fetchIntervenantByKey } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Calendar from '@/app/ui/calendar';
import { checkAvailabilityAndWorkweek } from '@/app/lib/actions';

const AvailabilityPage = async ({ params }: { params: { key: string } }) => {
  const key = params.key;

  if (!key || typeof key !== 'string') {
    notFound();
  }

  const { valid, intervenant, message } = await fetchIntervenantByKey(key);

  if (!valid) {
    if (message === 'Clé inconnue') {
      notFound();
    }
    return <div>{message}</div>;
  }

  const { missingWeeks, insufficientHours } = await checkAvailabilityAndWorkweek(key);

  return (
    <main className="container m-auto my-8">     
        <h1 className="text-center text-4xl mb-8">Disponibilités de {intervenant.firstname} {intervenant.lastname}</h1>
        {intervenant.last_modified && (
          <p className="text-center text-gray-600 mb-4">Dernière modification: <strong>{new Date(intervenant.last_modified).toLocaleDateString("fr-FR", { dateStyle: "full", timeZone: "Europe/Paris" })}</strong>
        </p>
        )}
        {missingWeeks.length > 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
            <strong className="font-bold">Attention!</strong>
            <span className="block sm:inline"> Vous n'avez pas encore saisi de disponibilités pour les semaines: {missingWeeks.join(', ')}.</span>
          </div>
        )}
        {insufficientHours.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <strong className="font-bold">Attention!</strong>
            <span className="block sm:inline"> Vous avez saisi moins d'heures que nécessaire pour les semaines suivantes:</span>
            <ul className="list-disc list-inside">
              {insufficientHours.map(({ week, totalHours, requiredHours }) => (
                <li key={week}>Semaine {week}: {totalHours} heures saisies, {requiredHours} heures requises</li>
              ))}
            </ul>
          </div>
        )}
        <Calendar availability={intervenant.availability ?? ''} intervenantKey={intervenant.key} />
    </main>
  );
};

export default AvailabilityPage;