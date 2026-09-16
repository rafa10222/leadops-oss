# ADR 0001: Keep the core domain provider-neutral

- Status: Accepted
- Date: 2026-09-16

## Context

Lead operations touch ad platforms, form tools, messaging APIs, CRMs and analytics systems. Their payloads and APIs change independently.

## Decision

The domain model will not mirror any single provider. Each provider receives an adapter or mapper at the boundary.

## Consequences

This adds small translation layers but keeps scoring, deduplication, policy and future AI-agent orchestration reusable across providers.
