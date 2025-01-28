import Image from "next/image"
import logo from './logo2015_2.png'
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image 
              src={logo}
              alt="Logo"
              width={40}
              
              priority
            />
      <p className="text-[22px]">Гидрометцентр ДНР</p>
    </div>
  );
}
