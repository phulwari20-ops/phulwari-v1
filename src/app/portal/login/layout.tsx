import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Parent Portal Login',
  description:
    'Secure login for Phulwari parents to view attendance, batch details and notices.',
  path: '/portal/login',
  noIndex: true,
});

export default function PortalLoginLayout({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  );
}
