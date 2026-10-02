// Build-time renderer: content/*.yml + content/about.md → index.html
// (FR-012). Run via `npm run render`; `npm run build` runs it before
// Tailwind so the generated markup is scanned for classes.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Eta } from 'eta';
import yaml from 'js-yaml';
import { marked } from 'marked';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const loadYaml = (p) => yaml.load(read(p));

// Escape the three characters hand-written HTML escapes; applied to every
// YAML string so templates can interpolate without re-escaping.
const escText = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const escDeep = (v) => {
  if (typeof v === 'string') return escText(v);
  if (Array.isArray(v)) return v.map(escDeep);
  if (v && typeof v === 'object')
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, escDeep(x)]));
  return v;
};

// Markdown (inline) with site-styled code spans and links.
marked.use({
  renderer: {
    codespan(token) {
      const text = typeof token === 'string' ? token : token.text;
      return `<span class="font-mono text-accent">${escText(text)}</span>`;
    },
    link(token) {
      const href = token.href;
      const text = this.parser.parseInline(token.tokens);
      return `<a class="text-ink underline decoration-line underline-offset-4 hover:decoration-accent" href="${href}" target="_blank" rel="noopener">${text}</a>`;
    },
  },
});
const mdInline = (s) => marked.parseInline(s.trim());

export async function buildData() {
  const site = loadYaml('content/site.yml');
  const capabilities = loadYaml('content/capabilities.yml');
  const projects = loadYaml('content/projects.yml');
  const experience = loadYaml('content/experience.yml');
  const credentials = loadYaml('content/credentials.yml');

  projects.repos.forEach((r) => {
    r.url = r.url || `https://github.com/${site.handle}/${r.name}`;
  });
  projects.status_line = 'Highlighted repositories · live stats from the GitHub API';

  const data = {
    site: escDeep(site),
    capabilities: escDeep(capabilities),
    projects: escDeep(projects),
    experience: escDeep(experience),
    credentials: escDeep(credentials),
    year: new Date().getFullYear(),
    hero: {
      // "A & B" → styled ampersand, parts escaped.
      title_html: site.title
        .split(' & ')
        .map(escText)
        .join(' <span class="text-muted">&amp;</span> '),
      about_html: mdInline(read('content/about.md')),
    },
    jsonld: { jobTitle: site.title }, // raw: lives inside JSON, not HTML text
  };
  data.credentials.community_html = mdInline(credentials.community);
  return data;
}

async function main() {
  const eta = new Eta({
    views: join(root, 'src'),
    autoEscape: false,
    autoTrim: false,
  });
  const html = eta.render('index.eta', await buildData());
  writeFileSync(join(root, 'index.html'), html);
  console.log(`render: index.html written (${Buffer.byteLength(html)} bytes)`);
}

main();
