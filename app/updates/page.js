import UpdatesList from './UpdatesList';
import UpdateForm from './UpdateForm';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Updates - TIE CEO',
  description: 'Latest updates and announcements from TIE CEO',
};

export default function Updates() {
  return (
    <>
      <Navigation />
      <main className="container">
        <h1>Updates</h1>
        <UpdateForm />
        <div className="updates-section">
          <h2>Recent Updates</h2>
          <UpdatesList />
        </div>
      </main>
      <Footer />
    </>
  );
} 