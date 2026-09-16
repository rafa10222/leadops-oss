import { randomUUID } from 'node:crypto';

const ALLOWED_INTENTS = new Set(['browse', 'quote', 'buy', 'support', 'unknown']);

export function normalizeLead(input = {}) {
  const externalId = clean(input.externalId);
  const source = clean(input.source) || 'unknown';
  const name = clean(input.name);
  const email = clean(input.email).toLowerCase();
  const phone = normalizePhone(input.phone);
  const intentCandidate = clean(input.intent).toLowerCase();
  const intent = ALLOWED_INTENTS.has(intentCandidate) ? intentCandidate : 'unknown';
  const estimatedValue = Number.isFinite(Number(input.estimatedValue)) ? Number(input.estimatedValue) : 0;

  if (!externalId && !email && !phone) {
    throw new Error('A lead requires at least externalId, email, or phone.');
  }

  return {
    id: randomUUID(),
    externalId,
    source,
    name,
    email,
    phone,
    intent,
    estimatedValue: Math.max(0, estimatedValue),
    consentToContact: input.consentToContact === true,
    campaign: {
      id: clean(input.campaign?.id),
      name: clean(input.campaign?.name)
    },
    metadata: isPlainObject(input.metadata) ? input.metadata : {},
    status: 'new',
    score: 0,
    temperature: 'cold',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function normalizePhone(value) {
  const raw = clean(value);
  if (!raw) return '';
  const plus = raw.startsWith('+');
  const digits = raw.replace(/\D/g, '');
  return digits ? `${plus ? '+' : ''}${digits}` : '';
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
