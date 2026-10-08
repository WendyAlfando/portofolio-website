// Canonical origin for metadata, sitemap and structured data.
// On Vercel, VERCEL_PROJECT_PRODUCTION_URL follows the production domain automatically,
// so adding a custom domain later needs no code change. NEXT_PUBLIC_SITE_URL overrides both.
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? vercelProductionUrl ?? "https://wendyalfando-portfolio.vercel.app")
    .replace(/\/$/, "")

export function absoluteUrl(path = "/") {
    return new URL(path, `${siteUrl}/`).toString()
}
