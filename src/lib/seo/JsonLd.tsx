import { buildGraph } from './schema'

/**
 * Renders one JSON-LD graph per page.
 *
 * Uses a plain <script> rather than next/script so the markup is present in the
 * server-rendered HTML — crawlers that do not execute JavaScript still see it.
 */
export function JsonLd({
  id,
  nodes,
}: {
  id: string
  nodes: Array<Record<string, unknown> | null | undefined>
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: buildGraph(...nodes) }}
    />
  )
}
