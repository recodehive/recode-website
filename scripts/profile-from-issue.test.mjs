import test from 'node:test';
import assert from 'node:assert/strict';
import { buildExtras, check, parseIssueForm } from './profile-from-issue.mjs';

const body = `### GitHub handle

Octo-Cat

### Ownership

- [x] I am the owner of this GitHub account

### Headline

Engineer at Example

### Bio

_No response_

### Time zone

Australia/Sydney

### LinkedIn URL

https://www.linkedin.com/in/octo

### Website URL

javascript:alert(1)

### Skills you want to declare

SQL, Python
Docker
`;

test('parses the form sections and treats "No response" as empty', () => {
  const f = parseIssueForm(body);
  assert.equal(f['GitHub handle'], 'Octo-Cat');
  assert.equal(f['Bio'], '');
  assert.equal(f['Headline'], 'Engineer at Example');
});

test('builds extras with only https links and split skills', () => {
  const e = buildExtras(parseIssueForm(body));
  assert.equal(e.headline, 'Engineer at Example');
  assert.equal(e.timezone, 'Australia/Sydney');
  assert.deepEqual(e.links, { linkedin: 'https://www.linkedin.com/in/octo', website: undefined, x: undefined });
  assert.deepEqual(e.skillsDeclared, ['SQL', 'Python', 'Docker']);
  assert.equal('bio' in e, false);
});

test('the issue author must be the profile owner', () => {
  const f = parseIssueForm(body);
  assert.equal(check(f, 'octo-cat').ok, true);
  assert.equal(check(f, 'someone-else').ok, false);
});

test('the ownership box must be ticked and the handle valid', () => {
  const unticked = parseIssueForm(body.replace('- [x]', '- [ ]'));
  assert.equal(check(unticked, 'octo-cat').ok, false);
  assert.equal(check(parseIssueForm(body.replace('Octo-Cat', '../etc')), '../etc').ok, false);
});
