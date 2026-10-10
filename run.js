#!/usr/bin/env node
/*
 * Tests for the OSINT Citation Generator.
 *
 * Run from the repository root with:  node tests/run.js
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

console.log(failed ? `\n${failed} failed, ${passed} passed` : `All ${passed} checks passed.`);
process.exit(failed ? 1 : 0);
