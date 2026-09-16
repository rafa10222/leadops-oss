import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreLead } from '../src/core/scoring.js';

test('scores high-intent contactable leads', () => {
  const result = scoreLead({
    phone: '+5561999999999', email: 'x@example.com', consentToContact: true, intent: 'buy', estimatedValue: 15000, campaign: { id: '1' }
  });
  assert.equal(result.score, 100);
  assert.ok(result.reasons.some(item => item.rule === 'buy_intent'));
});

test('returns zero for empty signal set', () => {
  assert.deepEqual(scoreLead({ phone: '', email: '', consentToContact: false, intent: 'unknown', estimatedValue: 0, campaign: {} }), { score: 0, reasons: [] });
});
