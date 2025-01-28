import AcmeLogo from '@/app/ui/acme-logo'
import SnowForm from './ui/create-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-10 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
        <AcmeLogo />
      </div> 
      <h1>Ввод данных снегомерных съемок</h1>
      <div className="items-top flex space-x-2">
        <SnowForm />
      </div>
    </main>
  );
}
