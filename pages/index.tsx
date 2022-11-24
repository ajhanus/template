import { useExample } from '../frontend/hooks/useQueryHook';

export default function Home() {
  const { example } = useExample();

  return (
    <div className='container'>
      <div className='mt-6 text-center text-lg text-gray-900'>Home Page</div>
      <div className='mt-4 text-center text-red-500'>{example}</div>
    </div>
  );
}
