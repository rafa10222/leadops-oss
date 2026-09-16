import { leadDedupeKey } from '../core/dedupe.js';

export class MemoryLeadRepository {
  #byId = new Map();
  #byKey = new Map();

  async findDuplicate(lead) {
    const id = this.#byKey.get(leadDedupeKey(lead));
    return id ? this.#byId.get(id) ?? null : null;
  }

  async save(lead) {
    this.#byId.set(lead.id, structuredClone(lead));
    this.#byKey.set(leadDedupeKey(lead), lead.id);
    return structuredClone(lead);
  }

  async list() {
    return [...this.#byId.values()].map(structuredClone);
  }
}
