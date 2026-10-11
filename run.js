#!/usr/bin/env node
/*
 * Tests for the OSINT Citation Generator.
 *
 * Run from the repository root with:  node Tests/run.js
 * Needs Node 18 or later and nothing else. It reads index.html, pulls out the
 * formatter (the <script id="core"> block) and the source-type table, and checks
 * that known inputs still produce the expected footnotes and files.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const core = html.match(/<script id="core">([\s\S]*?)<\/script>/);
if (!core) { console.error('Could not find <script id="core"> in index.html'); process.exit(1); }
const O = new Function(core[1] + ';return OSINT;')();
const ui = html.match(/<script>\s*\(function \(\) \{[\s\S]*?<\/script>/)[0];
const TYPES = new Function('return ' + ui.match(/var TYPES = (\{[\s\S]*?\n {2}\});/)[1])();
const TEXT_KEYS = new Function('return ' + ui.match(/var TEXT_KEYS = (\[[^\]]*\]);/)[1])();
const TYPE_NAMES = Object.keys(TYPES);

let failed = 0, passed = 0;
function eq(got, want, label) {
  if (got === want) { passed++; return; }
  failed++;
  console.log('FAIL  ' + label + '\n  got : ' + JSON.stringify(got) + '\n  want: ' + JSON.stringify(want));
}
// A blank form for a source type, then the type's built-in example, then any overrides.
function state(type, extra) {
  const t = TYPES[type];
  const st = { type, shortUseTitle: true, access: [], quals: [] };
  TEXT_KEYS.forEach((k) => { st[k] = ''; });
  st.contribRole = 'ed';
  st.titleStyle = t.style;
  Object.assign(st, t.sample, extra || {});
  st.volatile = !!t.volatile; st.live = !!t.live; st.dayDate = !!t.dayDate; st.ai = !!t.ai;
  return st;
}
function blank(style, fields) {
  const st = { type: 'web', shortUseTitle: true, access: [], quals: [], contribRole: 'ed', titleStyle: style };
  TEXT_KEYS.forEach((k) => { if (!(k in st)) st[k] = ''; });
  return Object.assign(st, fields);
}
const md = (st) => O.toMarkdown(O.build(st).seg);

// ---- 1. Every built-in example. Italics are shown here as *asterisks*. ----
const EXAMPLES = {
  book: `Michael Beckley, *Unrivaled: Why America Will Remain the World's Sole Superpower* [Monograph] (Cornell University Press: 2018): pp. 25–27.`,
  journal: `Sebastian Rosato, "The Flawed Logic of Democratic Peace Theory," *The American Political Science Review* [Peer-Reviewed Article; Vol. 97, No. 4] (2003): pp. 585–602.`,
  news: `Jane Doe, "Harbor Authority Confirms Second Dredging Contract," *The Example Dispatch* [News Article; B2] (12 February 2026) https://www.example.com/2026/02/12/harbor-dredging-contract.`,
  chapter: `Michael S. Chase, Jeffrey Engstrom, Tai Ming Cheung, et al., "People's Liberation Army Modernization: Mid-1990s to 2025," *China's Incomplete Military Transformation: Assessing the Weaknesses of the People's Liberation Army (PLA)* [Long-Form Publication by Think Tank] (RAND: 2015): p. 13.`,
  web: `Michael Kofman and Rob Lee, "Not Built for Purpose: The Russian Military's Ill-Fated Force Design," *War on the Rocks* [Defense Analysis Article; B2] (02 June 2022) https://warontherocks.com/2022/06/not-built-for-purpose-the-russian-militarys-ill-fated-force-design/.`,
  report: `The White House, *National Security Strategy of the United States of America*, *White House Government Website* [National Strategy Document; A1] (US Government: November 2025) https://www.whitehouse.gov/wp-content/uploads/2025/12/2025-National-Security-Strategy.pdf.`,
  social: `ExampleMonitor, "Drone Footage Near the River Crossing," *X* [Social Media Post; C3] (14 February 2026) https://x.com/example_monitor/status/1234567890. Archived: https://archive.ph/example (captured 14 February 2026).`,
  video: `John Doe, "How a Tiltrotor Moves from Hover to Forward Flight," *YouTube* [Video; C3] (Example Aviation Channel: 17 March 2026) https://www.youtube.com/watch?v=EXAMPLE0000: See 30:15–32:40 for discussion of airframe design.`,
  archival: `James Monroe, "Message of President James Monroe at the Commencement of the First Session of the 18th Congress (The Monroe Doctrine)," *US National Archives Website* [Archival Material; Primary Source; Record Group 46; Records of the US Senate, 1789–1990] (02 December 1823) https://www.archives.gov/milestone-documents/monroe-doctrine.`,
  live: `US Department of the Treasury, "Specially Designated Nationals List," *US Treasury Dept. Website* [Sanctions List; A1] (US Government: updated 08 March 2026, accessed 11 March 2026) https://sanctionslist.ofac.treas.gov/Home/SdnList.`,
  imagery: `Planet Labs PBC, "PlanetScope Imagery of Dzhankoi Airbase," *Planet Explorer* [Commercial Satellite Imagery; 3 m resolution; 45.7086° N, 34.4142° E; B2] (Planet Labs PBC: captured 09 March 2026, accessed 11 March 2026) https://www.planet.com/explorer/.`,
  ai: `Claude Opus 4.5, "Summary of open-source reporting on PLA joint logistics," *Claude.ai* [AI Model Output; prompt and full transcript on file; F6] (Anthropic: 12 March 2026).`,
};
TYPE_NAMES.forEach((k) => eq(md(state(k)), EXAMPLES[k], 'example: ' + k));
eq(Object.keys(EXAMPLES).sort().join(), TYPE_NAMES.slice().sort().join(), 'every source type has a tested example');

// ---- 2. Rules that the examples do not reach ----
eq(md(blank('quotes', { authors: 'Yuan Zheng', title: '美国对华科技政策的演变', transTitle: 'The Evolution of US Technology Policy Toward China', origLang: 'Chinese', location: 'American Studies Quarterly', descType: 'Peer-Reviewed Article', descDetails: 'Vol. 38, No. 2', rating: 'B2', date: '2024', locator: '44-61' })),
  `Yuan Zheng, "美国对华科技政策的演变" ["The Evolution of US Technology Policy Toward China"], *American Studies Quarterly* [Peer-Reviewed Article; Vol. 38, No. 2; original in Chinese; B2] (2024): pp. 44–61.`, 'translated title and original language');
eq(md(blank('quotes', { lead: 'Quoted in', authors: 'Armin Krishnan', title: 'Fifth Generation Warfare, Hybrid Warfare, and Gray Zone Conflict: A Comparison', location: 'Journal of Strategic Security', descType: 'Peer-Reviewed Article', descDetails: 'Vol. 15, No. 4', date: '2022', locator: 'p. 17' })),
  `Quoted in Armin Krishnan, "Fifth Generation Warfare, Hybrid Warfare, and Gray Zone Conflict: A Comparison," *Journal of Strategic Security* [Peer-Reviewed Article; Vol. 15, No. 4] (2022): p. 17.`, 'secondary citation lead-in');
eq(md(blank('italics', { authors: 'A One\nB Two\nC Three\nD Four', contribs: 'E Five', title: 'A Handbook', descType: 'Edited Volume', publisher: 'A Press', date: '2022', locator: '55-70' })),
  `A One, B Two, C Three, et al.; E Five (ed.), *A Handbook* [Edited Volume] (A Press: 2022): pp. 55–70.`, 'four authors become three and et al.; editor credited');
eq(md(blank('italics', { authors: 'A One\nB Two\nC Three', title: 'A Yearbook', location: 'IISS', descType: 'Military Reference Yearbook', rating: 'A2', publisher: 'IISS', date: '2025' })),
  `A One, B Two, and C Three, *A Yearbook*, *IISS* [Military Reference Yearbook; A2] (2025).`, 'publisher that repeats the location is dropped');
eq(md(blank('quotes', { authors: 'A One', title: '“A Pasted Title,”', location: 'A Journal', descType: 'Peer-Reviewed Article', date: '2019', url: '10.1234/example.5678', locator: '331 - 350' })),
  `A One, "A Pasted Title," *A Journal* [Peer-Reviewed Article] (2019) https://doi.org/10.1234/example.5678: pp. 331–350.`, 'bare DOI rewritten; pasted quotation marks cleaned');
eq(md(blank('quotes', { title: 'Who Runs the Port?', location: 'Harbor Watch', descType: 'Blog Post', url: 'harborwatch.example/port' })),
  `"Who Runs the Port?" *Harbor Watch* [Blog Post] (n.d.) https://harborwatch.example/port.`, 'no author, no date, title ending in a question mark');
eq(md(state('news', { access: ['paywalled'], quals: ['archived'] })),
  EXAMPLES.news.replace('[News Article; B2]', '[News Article; archived; paywalled; B2]'), 'bracket order: kind, qualifiers, access, rating');
eq(md(state('news', { access: ['other'], accessNote: 'print only' })),
  EXAMPLES.news.replace('[News Article; B2]', '[News Article; print only; B2]'), 'custom access note');

// ---- 3. Dates, locators, later citations, rating zones ----
[['2/12/2026', '12 February 2026'], ['Feb 12, 2026', '12 February 2026'], ['2026-02-12', '12 February 2026'], ['8 Sept 2026', '08 September 2026'],
  ['25/12/2025', '25 December 2025'], ['Nov 2025', 'November 2025'], ['2018', '2018'], ['n.d.', 'n.d.']].forEach(([a, b]) => eq(O.normDate(a).text, b, 'date ' + a));
eq(O.normDate('spring 2024').level, 'raw', 'unrecognised date left as typed');
[['25-27', 'pp. 25–27'], ['13', 'p. 13'], ['xii-xv', 'pp. xii–xv'], ['pp. 7, 12-14.', 'pp. 7, 12–14'], ['Article 4(2)', 'Article 4(2)'], ['30:15-32:40', '30:15–32:40']].forEach(([a, b]) => eq(O.normLocator(a), b, 'locator ' + a));
const short = (st) => O.toMarkdown(O.shortForms(st).short);
eq(short(state('book', { locator: '45' })), 'Beckley, *Unrivaled*, p. 45.', 'short form: book');
eq(short(state('web')), 'Kofman and Lee, "Not Built for Purpose."', 'short form: article, no locator');
eq(short(state('chapter')), `Chase et al., "People's Liberation Army Modernization," p. 13.`, 'short form: four authors');
eq(short(state('report')), 'The White House, *National Security Strategy of the United States of America*.', 'short form: organization kept whole');
eq(O.toPlain(O.shortForms(state('book', { locator: '51' })).ibid), 'Ibid., p. 51.', 'ibid.');
eq(['A1', 'B2', 'C1', 'C3', 'D4', 'E5', 'F1', 'A6'].map(O.zoneOf).join(''), 'GGGYORXX', 'rating zones');
const levels = (st) => O.build(st).checks.filter((c) => c.level !== 'note').map((c) => c.level + ':' + c.msg.slice(0, 22)).join(' | ');
eq(levels(state('social', { archiveUrl: '', archiveDate: '', url: 'https://bit.ly/abc' })).includes('fix:That is a link shorten'), true, 'link shortener flagged');
eq(levels(state('social', { archiveUrl: '', archiveDate: '' })).includes('check:Volatile source'), true, 'volatile source with no archive flagged');
eq(levels(state('live', { accessed: '' })).includes('check:A continuously updated'), true, 'live source with no access date flagged');
eq(levels(state('ai', { rating: 'B2' })).includes('check:AI model output'), true, 'AI output not rated F6 flagged');

// ---- 4. List files: save, reopen, refuse bad input ----
const items = TYPE_NAMES.map((k, n) => ({ id: 'id' + n, st: state(k) }));
items[1].st.access = ['paywalled']; items[1].st.quals = ['archived'];
const fileText = O.listFile('A Test Piece', items);
const back = O.parseListFile(fileText, TYPE_NAMES, TEXT_KEYS);
eq(back.name, 'A Test Piece', 'list file: name survives');
eq(back.items.length, items.length, 'list file: every source survives');
eq(back.items.map((x) => x.id).join(), items.map((x) => x.id).join(), 'list file: ids survive');
eq(back.items.map((x) => md(x.st)).join('\n'), items.map((x) => md(x.st)).join('\n'), 'list file: every footnote identical after save and reopen');
eq(JSON.parse(fileText).sources[0].footnote, EXAMPLES.book, 'list file: carries a readable footnote for each source');
eq(!!O.parseListFile('not json', TYPE_NAMES, TEXT_KEYS).error, true, 'list file: garbage refused');
eq(!!O.parseListFile('{"hello":1}', TYPE_NAMES, TEXT_KEYS).error, true, 'list file: unrelated JSON refused');
const odd = O.parseListFile(JSON.stringify({ sources: [{ fields: { type: 'nope', title: { x: 1 }, authors: 'A B', descType: 'Memo', access: 'paywalled', quals: [1, 'leaked'] } }, { fields: {} }, null, 5] }), TYPE_NAMES, TEXT_KEYS);
eq(odd.items.length, 1, 'list file: empty and malformed entries dropped');
eq([odd.items[0].st.type, odd.items[0].st.title, odd.items[0].st.access.join(), odd.items[0].st.quals.join()].join('|'), 'web||paywalled|leaked', 'list file: unknown type and wrong-typed fields cleaned');

// ---- 5. Exports ----
const segs = items.map((x) => O.build(x.st).seg);
eq(O.mdText('A Test Piece', segs).split('\n').slice(0, 3).join('\n'), '# A Test Piece\n\n1. ' + EXAMPLES.book, 'markdown export');
const csv = O.csvText(items.map((x) => x.st), {});
eq(csv.charCodeAt(0), 0xFEFF, 'csv export: starts with a byte-order mark so Excel reads UTF-8');
eq(csv.trim().split('\r\n').length, items.length + 1, 'csv export: one row per source plus a header');
const docx = O.docxBytes('A Test Piece', segs, 'i');
eq([docx[0], docx[1], docx[2], docx[3]].join(), '80,75,3,4', 'word export: is a zip container');
const tail = Buffer.from(docx.slice(-22));
eq(tail.readUInt32LE(0) === 0x06054b50 && tail.readUInt16LE(10), 3, 'word export: three parts in the package');
const xml = Buffer.from(docx).toString('utf8');
eq(xml.includes('<w:i/>') && !xml.includes('<w:u '), true, 'word export: titles in italics');
eq(Buffer.from(O.docxBytes('', segs, 'u')).toString('utf8').includes('<w:u w:val="single"/>'), true, 'word export: underline mode');

// ---- 6. Reading a link ----
const NOW = Date.UTC(2026, 9, 11, 15, 0, 0), TODAY = '11 October 2026';
const link = (l) => O.readLink(l, NOW, TODAY);
const got = (l) => { const r = link(l); return r ? Object.assign({ type: r.type }, r.fields) : null; };
// Build post IDs for known moments, so the test does not depend on any real post staying online.
const snowflake = (ms, epoch) => String((BigInt(ms) - BigInt(epoch)) << 22n);
const X_ID = snowflake(Date.UTC(2026, 1, 14, 23, 30), 1288834974657);
const DISCORD_ID = snowflake(Date.UTC(2025, 4, 3, 8, 0), 1420070400000);
const TIKTOK_ID = String(BigInt(Date.UTC(2024, 6, 4, 12, 0) / 1000) << 32n);
let tid = (BigInt(Date.UTC(2025, 10, 20, 6, 0)) * 1000n) << 10n, BSKY_ID = '';
for (let i = 0; i < 13; i++) { BSKY_ID = '234567abcdefghijklmnopqrstuvwxyz'[Number(tid % 32n)] + BSKY_ID; tid /= 32n; }

let r = got(`https://twitter.com/sentdefender/status/${X_ID}?s=20&t=abc`);
eq([r.type, r.location, r.descType, r.authors, r.date, r.url].join('|'), `social|X|Social Media Post|@sentdefender|14 February 2026|https://twitter.com/sentdefender/status/${X_ID}`, 'link: X post, date from the ID, share parameters dropped');
eq(got('https://x.com/elonmusk/status/1585841080431321088').date, '28 October 2022', 'link: a real X post ID decodes to its known date');
eq(got(`https://x.com/a/status/${X_ID}/photo/1`).url, `https://x.com/a/status/${X_ID}`, 'link: X photo suffix trimmed');
eq(got('https://x.com/a/status/20').date, undefined, 'link: old X IDs carry no date');
r = got('https://t.me/s/warmonitor3/48812');
eq([r.type, r.location, r.descType, r.authors, r.url].join('|'), 'social|Telegram|Channel Post|warmonitor3|https://t.me/warmonitor3/48812', 'link: Telegram preview link made canonical');
r = got('https://youtu.be/RSzdK_viw1Y?si=abc123&t=1815');
eq([r.type, r.location, r.locator, r.url].join('|'), 'video|YouTube|See 30:15|https://youtu.be/RSzdK_viw1Y', 'link: YouTube timestamp becomes the locator');
eq(got('https://www.youtube.com/watch?v=RSzdK_viw1Y&t=1h2m3s&feature=share').locator, 'See 1:02:03', 'link: YouTube h/m/s timestamp');
eq(got('https://www.youtube.com/watch?v=RSzdK_viw1Y&feature=share').url, 'https://www.youtube.com/watch?v=RSzdK_viw1Y', 'link: YouTube keeps the video ID');
eq(got(`https://www.tiktok.com/@someuser/video/${TIKTOK_ID}?is_from_webapp=1`).date, '04 July 2024', 'link: TikTok date from the ID');
eq(got(`https://bsky.app/profile/someone.bsky.social/post/${BSKY_ID}`).date, '20 November 2025', 'link: Bluesky date from the ID');
eq(got(`https://discord.com/channels/111111111111111111/222222222222222222/${DISCORD_ID}`).date, '03 May 2025', 'link: Discord date from the ID');
eq(got(`https://x.com/a/status/${snowflake(NOW + 30 * 864e5, 1288834974657)}`).date, undefined, 'link: an ID dated in the future is not trusted');
r = got(`https://web.archive.org/web/20260214123456/https://x.com/sentdefender/status/${X_ID}`);
eq([r.archiveDate, r.url, r.location, /^https:\/\/web\.archive\.org\//.test(r.archiveUrl)].join('|'), `14 February 2026|https://x.com/sentdefender/status/${X_ID}|X|true`, 'link: Wayback link split into archive copy and original');
r = got('https://archive.ph/2026.02.14-123456/https://www.nytimes.com/2026/02/12/us/politics/cyber-operations.html');
eq([r.archiveDate, r.location, r.date].join('|'), '14 February 2026|The New York Times|12 February 2026', 'link: archive.today long link');
eq(JSON.stringify(got('https://archive.ph/abc12')), '{"type":"","archiveUrl":"https://archive.ph/abc12"}', 'link: short archive link kept as the archive only');
r = got('https://www.nytimes.com/2026/02/12/us/politics/cyber-operations.html?smid=url-share&utm_source=x');
eq([r.type, r.location, r.descType, r.date, r.url].join('|'), 'news|The New York Times|News Article|12 February 2026|https://www.nytimes.com/2026/02/12/us/politics/cyber-operations.html', 'link: known outlet, date in the path, tracking dropped');
eq(got('https://www.reuters.com/world/europe/some-slug-2026-02-12/').date, '12 February 2026', 'link: date at the end of a slug');
eq(got('warontherocks.com/2022/06/a-slug/').date, 'June 2022', 'link: month-only path, and a link typed without https');
r = got('https://www.whitehouse.gov/wp-content/uploads/2025/12/2025-National-Security-Strategy.pdf');
eq([r.type, r.location, r.publisher, r.date, r.descType].join('|'), 'report|White House Government Website|US Government||', 'link: PDF is a report; upload-folder dates are ignored');
r = got('https://www.google.com/maps/@45.7086,34.4142,1200m/data=!3m1!1e3');
eq([r.type, r.descDetails, r.accessed].join('|'), 'imagery|45.7086° N, 34.4142° E|11 October 2026', 'link: coordinates from a map link');
eq(got('https://www.google.com/maps/@-33.8568,-151.2153,17z').descDetails, '33.8568° S, 151.2153° W', 'link: southern and western coordinates');
eq(got('https://sanctionslist.ofac.treas.gov/Home/SdnList').accessed, TODAY, 'link: live source gets today as its access date');
eq(JSON.stringify(got('https://www.unknown-site.example/story')), '{"type":"","url":"https://www.unknown-site.example/story"}', 'link: unknown site gives the link only');
eq([link('not a link'), link('ftp://x.y/z'), link(''), link('https://localhost/x')].join(), ',,,', 'link: non-links refused');
eq(got('https://example.com/a?id=5&utm_campaign=z#:~:text=hello').url, 'https://example.com/a?id=5', 'link: real parameters kept, tracking and text fragments dropped');

// ---- 7. Auditing a list ----
let audit = O.auditList(TYPE_NAMES.map((k) => state(k)));
eq([audit.total, audit.unrated].join('|'), '12|4', 'audit: counts sources and unrated sources');
eq(audit.rows.filter((x) => x.level === 'fix').length, 0, 'audit: the built-in examples have nothing to fix');
eq(audit.rows.map((x) => x.n + ':' + x.msg.slice(0, 2)).join(), `${TYPE_NAMES.indexOf('social') + 1}:C3,${TYPE_NAMES.indexOf('video') + 1}:C3,${TYPE_NAMES.indexOf('ai') + 1}:F6`, 'audit: flags the Yellow and Gray zone ratings');
audit = O.auditList([state('book'), state('social', { archiveUrl: '', archiveDate: '' }), state('news', { descType: '' }), state('live', { accessed: '' })]);
eq([audit.total, audit.attention].join('|'), '4|3', 'audit: three of four need a look');
eq(audit.rows.filter((x) => x.n === 3)[0].level, 'fix', 'audit: an empty description bracket is a fix');
audit = O.auditList([state('web'), state('book'), state('web', { locator: '' })]);
eq(audit.rows.some((x) => /^Sources 1 and 3 cite the same link/.test(x.msg)), true, 'audit: the same link cited twice');
audit = O.auditList([state('book'), state('book', { title: 'Unrivaled: A Second Book', publisher: 'Another Press' })]);
eq(audit.rows.some((x) => /^Sources 1 and 2 share the short form/.test(x.msg)), true, 'audit: two sources with the same short form');
eq(O.auditList([]).total, 0, 'audit: empty list');

console.log(failed ? `\n${failed} failed, ${passed} passed` : `All ${passed} checks passed.`);
process.exit(failed ? 1 : 0);
