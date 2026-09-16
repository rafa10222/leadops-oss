export function leadDedupeKey(lead) {
  if (lead.externalId) return `external:${lead.source}:${lead.externalId}`;
  if (lead.phone) return `phone:${lead.phone}`;
  if (lead.email) return `email:${lead.email}`;
  return `id:${lead.id}`;
}
