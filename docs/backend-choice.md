# Backend Choice

## Decision

Primary backend: Supabase.

Reason:
- Current code already has Supabase client boundary.
- Meeting data is relational.
- Postgres fits meeting → invite_link → response → confirmed_plan.
- Fastest path from localStorage prototype to real multi-user sync.

## Cloudflare Role

Cloudflare is not rejected.

Use Cloudflare later for:
- Hosting
- Edge routing
- Dynamic OG image generation
- Invite image caching
- R2 storage for generated invite cards
- Workers-based validation or image endpoints

Cloudflare D1 is not the primary MVP DB because:
- Current repository and schema already target Supabase/Postgres.
- D1 would require schema, mapper, and repository rewrite.
- RLS-equivalent validation would need to be built in Workers.
