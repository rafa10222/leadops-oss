const RULES = [
  { id: 'has_phone', points: 20, when: lead => Boolean(lead.phone), reason: 'A phone number enables direct contact.' },
  { id: 'has_email', points: 10, when: lead => Boolean(lead.email), reason: 'An email enables an additional contact channel.' },
  { id: 'consent', points: 15, when: lead => lead.consentToContact, reason: 'Lead explicitly consented to contact.' },
  { id: 'quote_intent', points: 25, when: lead => lead.intent === 'quote', reason: 'Lead requested a quote.' },
  { id: 'buy_intent', points: 35, when: lead => lead.intent === 'buy', reason: 'Lead declared purchase intent.' },
  { id: 'high_value', points: 20, when: lead => lead.estimatedValue >= 10000, reason: 'Estimated opportunity value is at least 10,000.' },
  { id: 'known_campaign', points: 5, when: lead => Boolean(lead.campaign?.id || lead.campaign?.name), reason: 'Acquisition campaign context is available.' }
];

export function scoreLead(lead) {
  const reasons = RULES.filter(rule => rule.when(lead)).map(({ id, points, reason }) => ({ rule: id, points, reason }));
  const raw = reasons.reduce((sum, item) => sum + item.points, 0);
  return { score: Math.min(100, raw), reasons };
}

export function scoringRules() {
  return RULES.map(({ id, points, reason }) => ({ id, points, reason }));
}
