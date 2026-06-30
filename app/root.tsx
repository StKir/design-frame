import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';

const ACCESS_PASSWORD = 'frame-design123';
const ACCESS_STORAGE_KEY = 'design-frame-access';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const Layout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const PasswordGate = ({ children }: { children: ReactNode }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsAllowed(window.localStorage.getItem(ACCESS_STORAGE_KEY) === 'true');
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ACCESS_PASSWORD) {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, 'true');
      setIsAllowed(true);
      setError('');
      return;
    }

    setError('Неверный пароль');
  };

  if (isAllowed) {
    return children;
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-950 px-5 text-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur'
      >
        <p className='text-sm font-medium text-gray-400'>Design Frame</p>
        <h1 className='mt-2 text-2xl font-semibold tracking-tight'>Введите пароль</h1>
        <input
          type='password'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError('');
          }}
          autoFocus
          className='mt-6 h-12 w-full rounded-2xl border border-white/10 bg-white/10 px-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-white/30'
          placeholder='Пароль'
        />
        {error && <p className='mt-3 text-sm font-medium text-red-300'>{error}</p>}
        <button
          type='submit'
          className='mt-5 h-12 w-full rounded-2xl bg-white text-sm font-semibold text-gray-950 transition hover:bg-gray-200'
        >
          Войти
        </button>
      </form>
    </main>
  );
};

const App = () => (
  <PasswordGate>
    <Outlet />
  </PasswordGate>
);

export default App;

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
};
