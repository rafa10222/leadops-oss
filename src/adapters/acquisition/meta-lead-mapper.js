export function mapMetaReferencePayload(payload = {}) {
  return {
    externalId: string(payload.id),
    source: 'meta_ads',
    name: string(payload.full_name),
    email: string(payload.email),
    phone: string(payload.phone_number),
    intent: string(payload.intent) || 'unknown',
    estimatedValue: number(payload.estimated_value),
    consentToContact: payload.consent_to_contact === true,
    campaign: {
      id: string(payload.campaign_id),
      name: string(payload.campaign_name)
    },
    metadata: payload.custom_fields && typeof payload.custom_fields === 'object' ? payload.custom_fields : {}
  };
}

function string(value) { return typeof value === 'string' ? value.trim() : ''; }
function number(value) { return Number.isFinite(Number(value)) ? Number(value) : 0; }
