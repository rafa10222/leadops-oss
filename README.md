# LeadOps OSS

> Open-source infrastructure for AI-powered lead operations.

LeadOps OSS is a self-hostable reference stack for connecting **lead acquisition → qualification → messaging → CRM → human sales handoff** without turning the orchestration layer into another closed SaaS.

It is being built around a recurring SMB problem: teams buy traffic in Meta Ads and Google Ads, receive leads in forms or WhatsApp, qualify them manually, update a CRM later (or not at all), and lose context between every step.

```text
Acquisition sources
      ↓
Lead ingestion + normalization
      ↓
Deduplication + explainable scoring
      ↓
Qualification / future AI-agent layer
      ↓
Messaging + CRM sync + human handoff
      ↓
Conversion events + attribution feedback
```

## Why LeadOps instead of another CRM?

The project focuses on the integration and orchestration layer *around* CRMs. Provider APIs remain replaceable; qualification logic stays inspectable; self-hosting is a first-class deployment model.

## v0.1 capabilities

- dependency-minimal Node.js 22 reference server
- generic REST lead ingestion
- normalized Meta Lead Ads reference mapper
- deterministic, explainable lead scoring
- cold / warm / hot qualification
- deduplication by provider ID, phone or email
- generic outbound CRM webhook adapter
- WhatsApp Cloud API text-message adapter
- explicit consent gate for demo automatic messaging
- Docker deployment
- unit tests + GitHub Actions CI

> **Status:** early-stage reference implementation. The in-memory repository is intentionally transparent and non-durable. Review the roadmap and security model before considering real deployment.

## Quick start

Requirements: Node.js 22+. No runtime packages are required for v0.1.

```bash
git clone https://github.com/rafa10222/leadops-oss.git
cd leadops-oss
cp .env.example .env
npm start
```

Health check:

```bash
curl http://localhost:3333/health
```

Create a lead:

```bash
curl -X POST http://localhost:3333/v1/leads \
  -H 'content-type: application/json' \
  -d '{
    "externalId": "demo-001",
    "source": "meta_ads",
    "name": "Demo Lead",
    "email": "demo@example.com",
    "phone": "+5561999999999",
    "intent": "buy",
    "estimatedValue": 12000,
    "consentToContact": true
  }'
```

Run checks:

```bash
npm run lint
npm test
```

## API

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/health` | service health |
| `GET` | `/v1/leads` | list in-memory leads |
| `POST` | `/v1/leads` | ingest provider-neutral lead input |
| `POST` | `/v1/webhooks/meta-leads` | ingest the documented Meta reference payload |

### Meta reference payload

```json
{
  "id": "provider-lead-id",
  "full_name": "Example Person",
  "email": "person@example.com",
  "phone_number": "+5561999999999",
  "campaign_id": "cmp_123",
  "campaign_name": "High Intent",
  "intent": "quote",
  "estimated_value": 12000,
  "consent_to_contact": true,
  "custom_fields": { "city": "Brasilia" }
}
```

This is a **reference normalized payload**, not a claim of drop-in compatibility with every raw Meta webhook shape. Provider verification and Graph API lead retrieval are roadmap work.

## Explainable scoring

The initial engine is deterministic on purpose. Every rule emits points and a human-readable reason, giving future AI qualification an auditable baseline instead of making the first version a black box.

Current example signals include contactability, explicit consent, purchase/quote intent, opportunity value and campaign context. See [`src/core/scoring.js`](src/core/scoring.js).

## CRM webhook

```env
CRM_WEBHOOK_URL=https://example.com/hooks/leadops
CRM_WEBHOOK_BEARER_TOKEN=replace-me
```

New accepted leads are emitted as:

```json
{ "event": "lead.upsert", "lead": {} }
```

## WhatsApp Cloud API

```env
WHATSAPP_ENABLED=true
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_ACCESS_TOKEN=your-token
WHATSAPP_API_VERSION=v23.0
AUTO_MESSAGE_HOT_LEADS=false
```

The automatic-message demo requires all of the following: feature flag enabled, hot classification, phone number present and `consentToContact=true`. Real deployments must additionally enforce Meta conversation/template rules, opt-outs and applicable privacy requirements.

## Design principles

- provider-neutral domain model
- replaceable adapters
- self-hosting first
- explainable qualification
- explicit consent and action policies
- human handoff by design
- AI as an auditable component, not an invisible side effect

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Security model](docs/SECURITY-MODEL.md)
- [Adapter notes](docs/ADAPTERS.md)
- [Architecture decision records](docs/decisions/)

## Contributing

Contributions are welcome, especially around acquisition-platform adapters, CRM integrations, WhatsApp workflows, observability, AI-agent evaluation, and Brazilian/Latin American implementation examples.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

MIT © Rafael Daher
