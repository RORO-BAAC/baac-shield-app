export const metadata = {
  title: 'BAAC SHIELD App',
  description: 'BAAC SHIELD Critical Risk Management App',
  manifest: '/manifest.json'
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
