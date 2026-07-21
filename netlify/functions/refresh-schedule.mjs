// Netlify scheduled function — runs every 3 hours via the `schedule` export.
// Triggers on-demand ISR revalidation for all forecast pages and the homepage.
// This ensures low-traffic forecast pages get refreshed on the same cadence as
// popular ones, fulfilling the "updated every 3 hours" product promise.

export const schedule = "0 */3 * * *";

export default async (req, context) => {
  const siteUrl =
    process.env.SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    `https://${process.env.NETLIFY_SITE_NAME}.netlify.app` ||
    "https://biteforecast.scot";

  const endpoint = `${siteUrl}/api/revalidate-forecasts`;

  context.log(`Triggering revalidation at ${endpoint}`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const body = await response.text();
    context.log(`Revalidation failed: ${response.status} — ${body}`);
    return new Response(`Failed: ${response.status}`, { status: 500 });
  }

  const body = await response.json();
  context.log(`Revalidation succeeded: ${JSON.stringify(body)}`);
  return new Response("OK", { status: 200 });
};