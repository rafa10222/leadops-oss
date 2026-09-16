# Security model

The repository is an early reference implementation, not a finished production security posture.

## Trust boundaries

1. **Inbound acquisition payloads are untrusted.** Validate shape, size and provider authenticity before processing.
2. **CRM and messaging credentials are secrets.** Load them from environment/secret managers and never log them.
3. **Lead data may contain personal information.** Apply least privilege, retention rules, auditability and applicable privacy law.
4. **AI outputs are untrusted.** Structured validation and explicit action policies must sit between a model and side effects.

## Current safeguards

- 1 MB JSON body limit
- normalization before domain use
- explicit consent flag for demo outbound messaging
- no secrets in source code
- provider adapters isolated from the core domain

## Required before production

- authentication and authorization
- encrypted durable storage
- webhook signature verification
- rate limiting
- audit log
- secret manager
- retry policy with bounded attempts
- data deletion/retention controls
- threat modeling for each enabled provider
