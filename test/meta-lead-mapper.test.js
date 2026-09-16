import test from 'node:test';
import assert from 'node:assert/strict';
import { mapMetaReferencePayload } from '../src/adapters/acquisition/meta-lead-mapper.js';

test('maps reference Meta payload to domain input', () => {
  const mapped = mapMetaReferencePayload({ id: 'L1', full_name: 'Ana', phone_number: '+5561', campaign_id: 'C1', consent_to_contact: true });
  assert.equal(mapped.externalId, 'L1');
  assert.equal(mapped.source, 'meta_ads');
  assert.equal(mapped.name, 'Ana');
  assert.equal(mapped.campaign.id, 'C1');
  assert.equal(mapped.consentToContact, true);
});
