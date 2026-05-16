# When We Meet Backend Schema

## Goal

Support the core invite loop:

1. Host creates a meeting.
2. App creates an invite link.
3. Guest opens invite.
4. Guest submits response.
5. Host sees responses.
6. Host confirms plan.

## Tables

### meetings

Stores host-created meeting drafts as persisted records.

Fields:
- id
- title
- host_name
- category
- status
- draft_payload
- created_at
- updated_at

### invite_links

Stores invite access policy.

Fields:
- id
- meeting_id
- token_hash
- token_plain_for_local_mvp_only
- access_mode
- is_closed
- expires_at
- max_responses
- duplicate_guard_mode (none | nickname | browser | device)
- created_at
- updated_at

MVP Note:
Local/dev MVP may temporarily store raw invite token for direct client lookup.
Production must store token_hash only and validate through server/edge function.

### meeting_responses

Stores guest responses.

Fields:
- id
- meeting_id
- invite_token_hash
- guest_name
- attendance
- date_votes
- place_suggestions
- activity_preferences
- message
- idempotency_key (used as the unique dimension for duplicate guard)
- source
- created_at
- updated_at

### confirmed_plans

Stores final host-confirmed plan.

Fields:
- id
- meeting_id
- date_label (nullable in DB for MVP resilience, but required by UI before host confirms)
- time_label
- place_name
- activity_labels
- confirm_source
- reason
- created_at
- updated_at

## Security

RLS policies are enabled on all tables.
MVP RLS policies are permissive for prototype validation.
Production must replace them with token-aware validation.
