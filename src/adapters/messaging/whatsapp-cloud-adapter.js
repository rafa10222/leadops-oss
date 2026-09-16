export class WhatsAppCloudAdapter {
  constructor({ phoneNumberId, accessToken, apiVersion = 'v23.0', fetchImpl = fetch }) {
    this.phoneNumberId = phoneNumberId;
    this.accessToken = accessToken;
    this.apiVersion = apiVersion;
    this.fetchImpl = fetchImpl;
  }

  isConfigured() {
    return Boolean(this.phoneNumberId && this.accessToken);
  }

  async sendText(to, body) {
    if (!this.isConfigured()) return { skipped: true, reason: 'not_configured' };
    const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;
    const response = await this.fetchImpl(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } })
    });
    if (!response.ok) throw new Error(`WhatsApp Cloud API failed with HTTP ${response.status}.`);
    return { skipped: false, status: response.status };
  }
}
