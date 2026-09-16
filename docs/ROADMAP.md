# Roadmap

This roadmap is intentionally public so contributors can see what is reference code today and what still needs production hardening.

## v0.2 — durable foundation

- PostgreSQL repository + migrations
- idempotency keys and event log
- API authentication
- structured request logging and trace IDs
- provider webhook signature verification
- rate limiting

## v0.3 — provider ecosystem

- raw Meta Lead Ads webhook verification + Graph API retrieval
- Google Ads lead-form adapter
- pluggable CRM adapter contract + reference connectors
- WhatsApp template-message support
- provider retry/backoff policies

## v0.4 — AI qualification

- provider-neutral AI-agent interface
- structured qualification schema
- tool calling with explicit allowlists
- confidence and human-review thresholds
- prompt/version registry
- offline evaluation fixtures

## v0.5 — closed-loop LeadOps

- sales-stage webhooks
- conversion feedback to acquisition sources
- attribution event model
- qualification funnel analytics
- SLA and lost-lead monitoring

## Non-goals

LeadOps OSS is not trying to replace CRMs, ad platforms or messaging providers. The project focuses on the orchestration and data-contract layer between them.
