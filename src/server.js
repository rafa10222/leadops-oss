import http from 'node:http';
import { readJsonBody, HttpError } from './http/body.js';
import { json } from './http/respond.js';
import { mapMetaReferencePayload } from './adapters/acquisition/meta-lead-mapper.js';

export function createServer({ leadService }) {
  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');

      if (request.method === 'GET' && url.pathname === '/health') {
        return json(response, 200, { ok: true, service: 'leadops-oss', version: '0.1.0' });
      }

      if (request.method === 'GET' && url.pathname === '/v1/leads') {
        return json(response, 200, { leads: await leadService.list() });
      }

      if (request.method === 'POST' && url.pathname === '/v1/leads') {
        const result = await leadService.ingest(await readJsonBody(request));
        return json(response, result.deduplicated ? 200 : 201, result);
      }

      if (request.method === 'POST' && url.pathname === '/v1/webhooks/meta-leads') {
        const body = await readJsonBody(request);
        const result = await leadService.ingest(mapMetaReferencePayload(body));
        return json(response, result.deduplicated ? 200 : 201, result);
      }

      return json(response, 404, { error: 'Not found' });
    } catch (error) {
      const status = error instanceof HttpError ? error.statusCode : 400;
      return json(response, status, { error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });
}
