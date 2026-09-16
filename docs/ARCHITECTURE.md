# Architecture

LeadOps OSS uses a small ports-and-adapters style architecture so acquisition, CRM and messaging providers can change without contaminating the domain model.

```text
Acquisition provider
      │
      ▼
 payload mapper ──► normalization ──► deduplication
                                      │
                                      ▼
                                scoring engine
                                      │
                                      ▼
                               lead repository
                                  │        │
                                  ▼        ▼
                             CRM adapter  messaging adapter
```

## Domain layer

`src/core` owns normalization, deduplication, qualification and temperature classification. It has no provider-specific URLs or payload shapes.

## Adapters

`src/adapters` translates external systems into the domain or domain events into provider calls. The first reference adapters cover a normalized Meta Lead Ads payload, a generic CRM webhook, and WhatsApp Cloud API text messages.

## Persistence

The v0.1 reference server uses an in-memory repository. This keeps the architecture easy to inspect, but it is intentionally not durable. PostgreSQL is a roadmap item and is required before serious production use.

## Failure model

The initial implementation is synchronous. A production deployment should introduce durable event storage, queues, retries, dead-letter handling and idempotency keys for outbound provider calls.

## AI boundary

AI is not required for the core ingestion path. Deterministic scoring is the baseline. Future AI qualification should implement an explicit interface, return structured outputs, preserve explainability, and never bypass consent or human handoff policies.
