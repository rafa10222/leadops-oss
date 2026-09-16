#!/usr/bin/env sh
set -eu

curl -sS -X POST http://localhost:3333/v1/leads \
  -H 'content-type: application/json' \
  -d '{"externalId":"demo-001","source":"meta_ads","name":"Demo Lead","phone":"+5561999999999","intent":"buy","estimatedValue":12000,"consentToContact":true}'
