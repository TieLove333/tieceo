import UpdatesList from './UpdatesList';
import UpdateForm from './UpdateForm';

export const metadata = {
  title: 'Updates - TIE CEO',
  description: 'Latest updates and announcements from TIE CEO',
};

export default function Updates() {
  return (
    <main className="container">
      <h1>Updates</h1>
      <UpdateForm />
      <div className="updates-section">
        <h2>Recent Updates</h2>
        <UpdatesList />
      </div>
    </main>
  );
} 