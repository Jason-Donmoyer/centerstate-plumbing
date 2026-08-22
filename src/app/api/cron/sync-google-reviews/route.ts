// src/app/api/cron/sync-google-reviews/route.ts
// TODO: Option B — Google Places API polling
// When ready:
// 1. Add GOOGLE_PLACES_API_KEY to environment variables
// 2. Fetch reviews from Places API using BUSINESS.googlePlaceId
// 3. Compare against testimonials where source = 'google'
// 4. Insert new reviews with visible: false, source: 'google', google_review_id
// 5. Email Jason via send-review-notification
// 6. Configure Vercel cron in vercel.json to run daily

export async function GET() {
    return Response.json({ message: 'Google Reviews sync not yet implemented' })
}