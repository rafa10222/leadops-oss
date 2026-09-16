import { normalizeLead } from './lead.js';
import { scoreLead } from './scoring.js';
import { temperatureFromScore } from './temperature.js';

export class LeadService {
  constructor({ repository, crm = null, messaging = null, autoMessageHotLeads = false }) {
    this.repository = repository;
    this.crm = crm;
    this.messaging = messaging;
    this.autoMessageHotLeads = autoMessageHotLeads;
  }

  async ingest(input) {
    const candidate = normalizeLead(input);
    const duplicate = await this.repository.findDuplicate(candidate);
    if (duplicate) {
      return { lead: duplicate, scoring: { score: duplicate.score, reasons: [] }, temperature: duplicate.temperature, deduplicated: true };
    }

    const scoring = scoreLead(candidate);
    candidate.score = scoring.score;
    candidate.temperature = temperatureFromScore(scoring.score);
    candidate.status = 'qualified';
    candidate.updatedAt = new Date().toISOString();

    const saved = await this.repository.save(candidate);

    if (this.crm) await this.crm.upsertLead(saved);

    if (this.autoMessageHotLeads && this.messaging && saved.temperature === 'hot' && saved.phone && saved.consentToContact) {
      await this.messaging.sendText(saved.phone, `Hi ${saved.name || 'there'}! Thanks for your interest. A specialist will follow up shortly.`);
      saved.status = 'contacted';
      saved.updatedAt = new Date().toISOString();
      await this.repository.save(saved);
    }

    return { lead: saved, scoring, temperature: saved.temperature, deduplicated: false };
  }

  async list() {
    return this.repository.list();
  }
}
