import { Metadata } from 'next';
import Image from 'next/image';
 
export const metadata: Metadata = {
  title: 'Credits',
};

export default function Page() {
    return (
        <>
            <Image src={"/customers/michael-novotny.png"} alt='' width={50} height={50}></Image>
            <p>Cet examen est l'oeuvre de Lancelot Thoré</p>;
        </>
    );
}