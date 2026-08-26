import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Parent Portal Dashboard',
  description:
    'Your child\'s attendance, batch schedule and notices at Phulwari.',
  path: '/portal/dashboard',
  noIndex: true,
});

export default function PortalDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  );
}
