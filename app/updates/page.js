import { Suspense } from 'react';
import UpdatesList from './UpdatesList';

export default function Updates() {
  return (
    <main className="updates-page">
      <section className="updates-header">
        <h1>Founder Updates</h1>
        <p>Follow my journey building in public</p>
      </section>
      
      <Suspense fallback={<div className="loading">Loading updates...</div>}>
        <UpdatesList />
      </Suspense>
    </main>
  );
} 