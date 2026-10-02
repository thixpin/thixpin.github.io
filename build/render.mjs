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

// Build-time GitHub enrichment (FR-004, contracts/github-api.md): per-repo
// fetch with per-repo fallback to the YAML values; never fails the build.
const warn = (msg) =>
  console.warn(process.env.GITHUB_ACTIONS ? `::warning::${msg}` : `WARN: ${msg}`);

async function enrichRepos(repos, owner) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  await Promise.allSettled(
    repos.map(async (r) => {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 10_000);
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${r.name}`, {
          headers,
          signal: ctl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const gh = await res.json();
        const apply = (field, live) => {
          if (live === null || live === undefined || live === '') return;
          if (r[field] !== undefined && String(r[field]) !== String(live))
            console.log(`render: ${r.name} ${field}: fallback ${JSON.stringify(r[field])} → live ${JSON.stringify(live)}`);
          r[field] = live;
        };
        if (!r.keep_description) apply('description', gh.description);
        apply('language', gh.language);
        apply('stars', gh.stargazers_count);
        apply('forks', gh.forks_count);
        apply('url', gh.html_url);
        apply('homepage', gh.homepage);
        if (Array.isArray(gh.topics) && gh.topics.length) r.topics = gh.topics;
      } catch (e) {
        warn(`GitHub enrichment failed for ${r.name} (${e.message}); using YAML fallback.`);
      } finally {
        clearTimeout(timer);
      }
    })
  );
}

export async function buildData() {
  const site = loadYaml('content/site.yml');
  const capabilities = loadYaml('content/capabilities.yml');
  const projects = loadYaml('content/projects.yml');
  const experience = loadYaml('content/experience.yml');
  const credentials = loadYaml('content/credentials.yml');

  projects.repos.forEach((r) => {
    r.url = r.url || `https://github.com/${site.handle}/${r.name}`;
  });
  await enrichRepos(projects.repos, site.handle);
  projects.repos.forEach((r) => {
    r.stars = Number(r.stars).toLocaleString('en-US');
    if (r.forks !== undefined && r.forks !== null)
      r.forks = Number(r.forks).toLocaleString('en-US');
  });
  const built = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  projects.status_line = `Highlighted repositories · stats as of ${built}`;

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
