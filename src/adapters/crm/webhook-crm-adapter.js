export class WebhookCrmAdapter {
  constructor({ url, bearerToken = '', fetchImpl = fetch }) {
    this.url = url;
    this.bearerToken = bearerToken;
    this.fetchImpl = fetchImpl;
  }

  async upsertLead(lead) {
    if (!this.url) return { skipped: true };
    const headers = { 'content-type': 'application/json' };
    if (this.bearerToken) headers.authorization = `Bearer ${this.bearerToken}`;
    const response = await this.fetchImpl(this.url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ event: 'lead.upsert', lead })
    });
    if (!response.ok) throw new Error(`CRM webhook failed with HTTP ${response.status}.`);
    return { skipped: false, status: response.status };
  }
}
