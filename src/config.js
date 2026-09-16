export function loadConfig(env = process.env) {
  return {
    port: Number(env.PORT || 3333),
    crmWebhookUrl: env.CRM_WEBHOOK_URL || '',
    crmWebhookBearerToken: env.CRM_WEBHOOK_BEARER_TOKEN || '',
    whatsapp: {
      enabled: env.WHATSAPP_ENABLED === 'true',
      phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID || '',
      accessToken: env.WHATSAPP_ACCESS_TOKEN || '',
      apiVersion: env.WHATSAPP_API_VERSION || 'v23.0'
    },
    autoMessageHotLeads: env.AUTO_MESSAGE_HOT_LEADS === 'true'
  };
}
