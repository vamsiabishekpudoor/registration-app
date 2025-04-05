'use client';

import './globals.css';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Registration App</h1>
            <nav className="space-x-4">
              <button
                onClick={() => router.push('/forms')}
                className="px-4 py-2 text-gray-700 hover:text-blue-500"
              >
                All Forms
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-700 hover:text-blue-500"
              >
                Create New Form
              </button>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}