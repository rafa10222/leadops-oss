import test from 'node:test';
import assert from 'node:assert/strict';
import { LeadService } from '../src/core/lead-service.js';
import { MemoryLeadRepository } from '../src/repositories/memory-lead-repository.js';

test('ingests and deduplicates provider leads', async () => {
  const service = new LeadService({ repository: new MemoryLeadRepository() });
  const first = await service.ingest({ externalId: '42', source: 'meta_ads', phone: '+5561999999999', intent: 'quote', consentToContact: true });
  const second = await service.ingest({ externalId: '42', source: 'meta_ads', phone: '+5561888888888' });
  assert.equal(first.deduplicated, false);
  assert.equal(second.deduplicated, true);
  assert.equal(first.lead.id, second.lead.id);
});

test('only sends automatic message when configured policy allows it', async () => {
  const sent = [];
  const messaging = { sendText: async (...args) => sent.push(args) };
  const service = new LeadService({ repository: new MemoryLeadRepository(), messaging, autoMessageHotLeads: true });
  await service.ingest({ externalId: '99', source: 'meta_ads', name: 'Jo', phone: '+5561999999999', email: 'jo@example.com', intent: 'buy', estimatedValue: 12000, consentToContact: true });
  assert.equal(sent.length, 1);
});
