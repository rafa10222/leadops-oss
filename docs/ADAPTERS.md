# Adapter contract notes

Adapters should be thin translations around provider APIs. Business decisions belong in the domain layer.

## Acquisition adapters

Return provider-neutral lead input fields. Preserve provider-specific extras under `metadata` rather than leaking them into the core model.

## CRM adapters

Expose an operation equivalent to `upsertLead(lead)`. Implement idempotency in production adapters whenever the destination supports it.

## Messaging adapters

Expose explicit message operations. Do not hide consent, template, session-window or opt-out policies inside prompt text. Those policies should be code-level controls and auditable.
