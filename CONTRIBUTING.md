# Contributing

Thanks for helping make lead operations infrastructure more open and interoperable.

## Development

```bash
git clone https://github.com/rafa10222/leadops-oss.git
cd leadops-oss
npm run lint
npm test
```

Node.js 22+ is required. v0.1 intentionally has no runtime dependencies.

## Pull requests

Keep changes narrow and explain the operational problem they solve. New provider adapters should isolate provider payloads from the core domain. Any feature that causes an external side effect must document consent, authorization, retry and idempotency assumptions.

Please add or update tests when behavior changes. Do not commit API tokens, customer data, real phone numbers, exported CRM records or private webhook payloads.

## Issues

Bug reports should include a minimal sanitized reproduction. Feature requests are more useful when they describe the workflow gap before proposing a specific vendor integration.

## Commit style

Conventional-style prefixes are encouraged (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`), but clarity matters more than ceremony.
