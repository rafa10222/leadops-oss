import { loadConfig } from './config.js';
import { MemoryLeadRepository } from './repositories/memory-lead-repository.js';
import { WebhookCrmAdapter } from './adapters/crm/webhook-crm-adapter.js';
import { WhatsAppCloudAdapter } from './adapters/messaging/whatsapp-cloud-adapter.js';
import { LeadService } from './core/lead-service.js';
import { createServer } from './server.js';

const config = loadConfig();
const repository = new MemoryLeadRepository();
const crm = config.crmWebhookUrl ? new WebhookCrmAdapter({ url: config.crmWebhookUrl, bearerToken: config.crmWebhookBearerToken }) : null;
const messaging = config.whatsapp.enabled ? new WhatsAppCloudAdapter(config.whatsapp) : null;
const leadService = new LeadService({ repository, crm, messaging, autoMessageHotLeads: config.autoMessageHotLeads });
const server = createServer({ leadService });

server.listen(config.port, '0.0.0.0', () => {
  console.log(`LeadOps OSS listening on http://0.0.0.0:${config.port}`);
});
