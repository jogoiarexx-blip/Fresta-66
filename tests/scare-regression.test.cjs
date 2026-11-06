'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const entry = html.match(/<script[^>]+src="\.\/([^"]+\.js)"/)?.[1];
assert.ok(entry, 'production entrypoint missing');
const code = fs.readFileSync(path.join(root, entry), 'utf8');

test('six documented scripted scare IDs are represented in the active bundle', () => {
  for (let id = 1; id <= 6; id++) {
    const key = 'JS' + String(id).padStart(2, '0');
    assert.ok(code.includes('"' + key + '"'), key + ' missing');
  }
});
test('JS03 uses the actual maintenance door, persistent event and visible spatial reaction', () => {
  assert.match(code, /e\.id==="maintenanceDoor"&&t\.doors\[e\.id\]&&ke\(t,"JS03"/);
  assert.match(code, /me\(t,"JS03",!0\)/);
  assert.match(code, /this\.doorHandTime=1\.35/);
  assert.match(code, /this\.worldRoot\.add\(g\)/);
  assert.match(code, /this\.doorHand\.visible=this\.doorHandTime>0&&!this\.room\.safe/);
});
test('state persistence still includes the scare event registry and cooldown', () => {
  assert.match(code, /events:\[\]/);
  assert.match(code, /lastScare/);
  assert.match(code, /o\.events\.includes\(e\)/);
});
