import dynamic from 'next/dynamic';
const NotificationAPIComponent = dynamic(
  () => import('@/components/NotificationAPIComponent'),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <h1>Welcome to Notification App</h1>
      <NotificationAPIComponent />
    </div>
  );
}
