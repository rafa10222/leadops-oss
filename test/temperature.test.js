import test from 'node:test';
import assert from 'node:assert/strict';
import { temperatureFromScore } from '../src/core/temperature.js';

test('maps thresholds to temperatures', () => {
  assert.equal(temperatureFromScore(0), 'cold');
  assert.equal(temperatureFromScore(40), 'warm');
  assert.equal(temperatureFromScore(70), 'hot');
});
