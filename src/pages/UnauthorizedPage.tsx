import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '4rem', color: '#dc2626' }}>403</h1>
      <h2 style={{ marginBottom: '1rem' }}>Access Denied</h2>
      <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
        You don't have permission to access this page. Please contact an administrator if you
        believe this is an error.
      </p>
      <Link
        to="/"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          display: 'inline-block',
        }}
      >
        Go to Homepage
      </Link>
    </div>
  );
}
