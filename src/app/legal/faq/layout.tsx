import type { ReactNode } from 'react'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/lib/seo/JsonLd'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo/schema'
import { CENTRE_FAQS } from '@/lib/seo/faq-data'

const PATH = '/legal/faq'

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Legal', path: '/legal/faq' },
  { name: 'FAQ', path: PATH },
]

const TITLE = 'Frequently Asked Questions'
const DESCRIPTION =
  'Answers to common questions about Phulwari Patna — minimum age, activities offered, ' +
  'batch timings, safety, birthday parties, camps, fees and how to enrol your child.'

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    'Phulwari FAQ',
    'kids activity centre Patna questions',
    'Phulwari admission age',
    'Phulwari batch timings',
  ],
})

export default function LegalFaqLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* FAQPage markup lives here and only here — it was previously injected
          site-wide from the root layout, which put FAQ markup on pages that do
          not display these questions. */}
      <JsonLd
        id="legal-faq-schema"
        nodes={[
          webPageSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            breadcrumb: BREADCRUMB,
          }),
          breadcrumbSchema(PATH, BREADCRUMB),
          faqSchema(PATH, CENTRE_FAQS),
        ]}
      />
      {children}
    </>
  )
}
