# OSINT Style Guide citations: instructions for AI assistants

This file tells an AI assistant how to cite sources in the form set out by the OSINT Style Guide. Give it to your assistant, or point the assistant at this address, and ask it to cite this way.

It matches version 3.2 of the OSINT Citation Generator: https://gmichaelrapp.github.io/OSINT_Cites/

The point of the form is that a reader can find every source and judge it before trusting it. A citation that cannot be followed, or that hides what kind of thing it points to, has failed even if it is formatted correctly.

## Rules that come before formatting

These matter more than anything below. A well-formatted citation to a source that does not exist does harm.

1. Cite only sources you actually opened or were given in this conversation. Never cite from memory.
2. Never invent or guess any part of a citation: not the link, the author, the title, the date, or the page. If you do not know a slot, leave it out and say so in a list after your footnotes headed "Needs checking".
3. Copy titles and names exactly as the source gives them. Do not tidy capitalization or fix errors. Mark an error in the source with [sic].
4. Do not assign a source rating. Ratings are the analyst's own judgment, made on the record. Include one only when the person you are working for gives it to you. A missing rating does not need to be listed under "Needs checking".
5. Treat every citation you prepare as unverified until a person has checked it against the source. Say this once, plainly, in your reply where you present the citations. Do not write it into the footnotes themselves.
6. Your own output is not a source for facts. If a claim came from you and not from a source you opened, it has no citation, and you should say it is unsourced.
7. Where several outlets repeat one original report, cite the original where you can reach it, and say when you could not.

## The pattern

Every footnote is built from the same eight slots, in this order:

```
Author, "Title," Location [Description] (Publisher: Date) URL/DOI: Locator.
```

- Short works (articles, posts, chapters, videos, web pages, and a named list or page on a larger site) take quotation marks. Larger works (books and standalone reports) take italics. The table of source types at the end of this file gives the style for each type.
- The location is always in italics.
- A slot that does not apply is dropped together with its punctuation. Never leave an empty bracket, an empty parenthesis, or a stray comma.
- The footnote ends with a period.

In plain text or Markdown, show italics with asterisks: `*The New York Times*`.

## The eight slots

**1. Author.** First name then surname. Keep surname-first order where that is the person's own (Xi Jinping). Two authors: "A and B". Three: "A, B, and C". Four or more: the first three, then "et al." No named author: use the organization, or the outlet followed by "Staff". For a social media account, use the account name; if you only know the handle, use the handle with its @. With no author at all, begin with the title.

Editors, translators, and contributors follow the authors after a semicolon, each name tagged with its role, editors first, then translators, then contributors. Join them the way authors are joined: two names with "and", three or more with commas and a final "and".

```
A. Author; E. Editor (ed.), T. Translator (trans.), and C. Contributor (contr.), *A Title* [Edited Volume] (A Press: 2020).
A. Author; E. Editor (ed.) and T. Translator (trans.), *A Title* [Novel] (A Press: 2020).
```

A footnote may open with "See", "Cited in", or "Quoted in". Use "Cited in" or "Quoted in" whenever you are relying on someone else's reproduction of a source you did not see yourself, including a screenshot of a post.

**2. Title.** As the source gives it. If the title ends in a question mark or exclamation mark, do not add a comma after it. A social media post has no headline, so use its own opening words in quotation marks, cut to about a dozen words with an ellipsis if it runs longer. If the source has no title, write a short plain description in its place, with no quotation marks or italics, a capital on the first word only, and a comma after it:

```
Example Channel, Footage of a convoy, *Telegram* [Video Post] (03 May 2025) https://t.me/examplechannel/1234.
```

**3. Location.** The publication, platform, site, series, or archive that holds the source: *X*, *Telegram*, *YouTube*, *Journal of Strategic Studies*, *White House Government Website*. Ten words or fewer. For a chapter, the location is the title of the volume it sits in. If the location would repeat the title, drop the location.

**4. Description.** In square brackets, and never dropped. It tells the reader what kind of source this is before they open it. Items inside are separated by semicolons and go in this order:

1. the kind of source
2. details: volume and issue, report number, episode, resolution, coordinates
3. qualifiers about this copy of the source
4. language notes
5. access notes
6. the rating, only if you were given one

Example: `[Peer-Reviewed Article; Vol. 38, No. 2; original in Chinese; institutional access; B2]`

**5. Publisher.** Who issued the source. Drop it when it would repeat the location, which is the usual case for journals, newspapers, magazines, and wire services. For video and social posts it holds the channel or account when that differs from the author.

**6. Date.** Publisher and date share one parenthesis, split by a colon: `(RAND: 2015)`. With no publisher: `(2015)`.

- News, social media, video, press releases, and anything else where the day matters: `DD Month YYYY`, with a two-digit day and the month spelled out: `08 March 2026`.
- Books and journal articles: the year alone.
- No date: `n.d.`
- A continuously updated source (a sanctions list, a tracker, a registry, a dashboard) needs the date you looked at it: `(US Government: updated 08 March 2026, accessed 11 March 2026)`.
- Imagery gives its capture date: `(Planet Labs PBC: captured 09 March 2026, accessed 11 March 2026)`.

**7. URL or DOI.** The full address. Never a shortened link. Remove tracking and share parameters, such as `utm_source`, `?s=20` on an X link, or `si=` on a YouTube link. If a video link carries a start time (`t=615s`), drop it from the link and give the time in the locator. Give a DOI as `https://doi.org/...`.

**8. Locator.** After a colon at the end. `p. 13` for one page, `pp. 25–27` for a range, with an en dash. Where there are no pages, name the section (`Article 4(2)`) or give a timestamp (`See 30:15–32:40 for discussion of airframe design`). Never count paragraphs. A quotation or a specific claim always takes a locator where the source has pages or timestamps.

## What goes in the description bracket

**Kind of source.** Use the most specific term that fits. The full library has 771 terms and can be browsed in the generator. These are the ones most often needed:

- News and analysis: News Article, Wire Service Report, News Analysis, Investigative Report, Magazine Article, Editorial / Op-Ed, State Media Report, Fact-Check
- Social and web: Social Media Post, Channel Post, Thread, Video Post, Short-Form Video, Forum Post, Blog Post, Web Page, Deleted Post (Archived), Screenshot (Provenance Unverified)
- Video and audio: Video, Podcast, Recorded Interview, Broadcast Transcript, Combat Footage, Drone Footage
- Government and legal: Government Report, Government Press Release, Government Web Page, CRS Report, GAO Report, National Strategy Document, Defense White Paper, Executive Order, Public Law / Statute, Court Filing, Indictment, Sanctions List, Declassified Document, FOIA-Released Document
- Books: Monograph, Trade Book, Edited Volume, Book Section, Textbook, Memoir, Biography, Novel
- Research: Peer-Reviewed Article, Journal Article, Preprint Paper, Working Paper, Conference Paper, Dissertation, Think Tank Report, Policy Brief, Policy Analysis, Defense Analysis Article
- Imagery and tracking: Commercial Satellite Imagery, Annotated Satellite Imagery, Geolocation Analysis, Flight Tracking Data, Ship Tracking (AIS), Interactive Map
- Other: Archival Material, Primary Source, Leaked Document, Corporate Press Release, Annual Report, Threat Intelligence Report, Human Rights Report, Open-Source Investigation, AI Model Output

If nothing fits, write a plain description of ten words or fewer.

Three choices come up often:

- A post that is mainly a video is a Video Post, or a Short-Form Video on TikTok, Reels, or Shorts. A text or image post is a Social Media Post, or a Channel Post when it was sent to a broadcast channel such as a Telegram channel.
- Call a journal article a Peer-Reviewed Article only when you know the journal sends its articles to outside referees. Where the journal reviews some other way, write Journal Article and add the qualifier that fits: `editor-reviewed`, `student-edited`, or `not peer-reviewed`. When you do not know, write Journal Article and add `review status unclear`. Never leave Journal Article without one of these four.
- A Monograph is a scholarly book making one sustained argument for specialists, usually from a university or academic press. A Trade Book is written for general readers, usually from a commercial house, even when a scholar wrote it. When you cannot tell, use Trade Book.

A journal article whose review status you could not establish (a placeholder source, to show the form):

Jane Doe, "Port Capacity and Naval Logistics in the Eastern Mediterranean," *Example Journal of Maritime Studies* [Journal Article; Vol. 12, No. 3; review status unclear] (2024): pp. 45–67.

**Qualifiers.** These describe this copy of the source, not its kind. Use only the ones that apply. The format qualifiers are for a source you have in an unexpected form, such as a speech you are citing from its transcript; a Video Post does not also need `video`.

- Provenance: leaked, declassified, FOIA-released, redacted, captured, official release, provenance verified, provenance unverified
- Version: preprint, accepted manuscript, version of record, advance online, draft, forthcoming, revised, corrected, retracted, superseded
- Review status: peer-reviewed, editor-reviewed, student-edited, not peer-reviewed, review status unclear
- Format: transcript, video, audio, scan, facsimile, microfilm, e-book, audiobook, abstract only, excerpt
- Capture status: archived, edited after capture, screenshot only, reupload
- Interest: industry-funded, government-funded, sponsored, state-affiliated, author affiliated with subject
- Synthetic content: AI-generated, AI-assisted, suspected synthetic, digitally altered

**Language notes.**

- A source not in English: give the title in the original language, then the title in English in square brackets, set the same way as the original (in quotation marks for a short work, in italics for a larger one). The comma that would follow the title moves to after the closing bracket. Add `original in <language>` to the description. If you read it through your own translation add `translation by author`. If you read it through machine translation, the wording is `machine translation; original in <language>`. You are an AI, so a translation you make yourself counts as machine translation.
- A published English translation: give the English title, credit the translator with `(trans.)`, and add `translated from <language>`.

```
Yuan Zheng, "美国对华科技政策的演变" ["The Evolution of US Technology Policy Toward China"], *American Studies Quarterly* [Peer-Reviewed Article; Vol. 38, No. 2; machine translation; original in Chinese] (2024): pp. 44–61.
```

**Access notes.** Say what stands between the reader and the source: `paywalled`, `metered paywall`, `free registration required`, `institutional access`, `region-restricted`, `app only`. A source that is free to read gets no access note. If you cannot tell, give none; it does not need listing under "Needs checking".

**Rating.** A letter and a number, such as `B2`. The letter (A to F) rates the reliability of the source and the number (1 to 6) rates the credibility of the information. Rule 4 above applies: do not supply one yourself.

## Archive copies

Anything that can be deleted or edited needs an archive copy: social media posts, Telegram and Discord content, blogs, forum posts, and pages likely to be revised. Add it after the link, as its own sentence:

```
... URL. Archived: ARCHIVE-URL (captured DD Month YYYY).
```

A video on a platform such as YouTube does not require an archive copy, though one is welcome. A source cited with its archive link does not also need the `archived` qualifier.

You can only include an archive link you were given or opened. If a volatile source has none, cite it without one and list it under "Needs checking" as needing an archive copy. Do not make one up.

## Special cases

- **Deleted or edited posts.** Keep the original link and the archive link, and note the change in the description: `[Social Media Post; deleted by 16 February 2026]`.
- **Screenshots.** A screenshot of a post is not the post. Cite the account that circulated the screenshot, open with "Cited in", and describe it as `Screenshot (Provenance Unverified)` unless its origin has been established.
- **Satellite and aerial imagery.** Give the provider as author, and put resolution and coordinates in the description. A location you worked out yourself is a judgment, not source data: put it in a sentence after the citation and say how it was established.
- **AI output.** Cite the model name and version as author, describe the output as the title, and use `[AI Model Output; prompt and full transcript on file; F6]`. This records that a model was used. It does not support a factual claim.
- **Commentary.** A caveat, or a note on how a date or location was established, goes in its own sentence after the citation.

## Citing the same source again

After the first full citation, use the short form: surname, a shortened title, and the locator.

```
Full:   Michael Beckley, *Unrivaled: Why America Will Remain the World's Sole Superpower* [Monograph] (Cornell University Press: 2018): pp. 25–27.
Short:  Beckley, *Unrivaled*, p. 45.
```

For a short work the shortened title stays in quotation marks: `Kofman and Lee, "Not Built for Purpose."`

Prefer the short form to "Ibid.", which breaks when footnotes are reordered.

## Several sources in one footnote

Anchor footnotes at the end of a paragraph, not after every sentence. A footnote that carries several sources separates them with semicolons. Where it is not obvious which source supports which claim, say so inside the footnote: "On force design, see ...; on casualty figures, see ...".

## Worked examples

Each of these was produced by the generator. Examples that use Jane Doe, John Doe, or an address containing "example" are placeholders that show the form.

Book:

```
Michael Beckley, *Unrivaled: Why America Will Remain the World's Sole Superpower* [Monograph] (Cornell University Press: 2018): pp. 25–27.
```

Journal article:

```
Sebastian Rosato, "The Flawed Logic of Democratic Peace Theory," *The American Political Science Review* [Peer-Reviewed Article; Vol. 97, No. 4] (2003): pp. 585–602.
```

News or magazine:

```
Jane Doe, "Harbor Authority Confirms Second Dredging Contract," *The Example Dispatch* [News Article; B2] (12 February 2026) https://www.example.com/2026/02/12/harbor-dredging-contract.
```

Chapter or section:

```
Michael S. Chase, Jeffrey Engstrom, Tai Ming Cheung, et al., "People's Liberation Army Modernization: Mid-1990s to 2025," *China's Incomplete Military Transformation: Assessing the Weaknesses of the People's Liberation Army (PLA)* [Long-Form Publication by Think Tank] (RAND: 2015): p. 13.
```

Website or think tank:

```
Michael Kofman and Rob Lee, "Not Built for Purpose: The Russian Military's Ill-Fated Force Design," *War on the Rocks* [Defense Analysis Article; B2] (02 June 2022) https://warontherocks.com/2022/06/not-built-for-purpose-the-russian-militarys-ill-fated-force-design/.
```

Report or government document:

```
The White House, *National Security Strategy of the United States of America*, *White House Government Website* [National Strategy Document; A1] (US Government: November 2025) https://www.whitehouse.gov/wp-content/uploads/2025/12/2025-National-Security-Strategy.pdf.
```

Social media post:

```
ExampleMonitor, "Drone Footage Near the River Crossing," *X* [Social Media Post; C3] (14 February 2026) https://x.com/example_monitor/status/1234567890. Archived: https://archive.ph/example (captured 14 February 2026).
```

Video or podcast:

```
John Doe, "How a Tiltrotor Moves from Hover to Forward Flight," *YouTube* [Video; C3] (Example Aviation Channel: 17 March 2026) https://www.youtube.com/watch?v=EXAMPLE0000: See 30:15–32:40 for discussion of airframe design.
```

Primary or archival:

```
James Monroe, "Message of President James Monroe at the Commencement of the First Session of the 18th Congress (The Monroe Doctrine)," *US National Archives Website* [Archival Material; Primary Source; Record Group 46; Records of the US Senate, 1789–1990] (02 December 1823) https://www.archives.gov/milestone-documents/monroe-doctrine.
```

Live list or tracker:

```
US Department of the Treasury, "Specially Designated Nationals List," *US Treasury Dept. Website* [Sanctions List; A1] (US Government: updated 08 March 2026, accessed 11 March 2026) https://sanctionslist.ofac.treas.gov/Home/SdnList.
```

Satellite imagery:

```
Planet Labs PBC, "PlanetScope Imagery of Dzhankoi Airbase," *Planet Explorer* [Commercial Satellite Imagery; 3 m resolution; 45.7086° N, 34.4142° E; B2] (Planet Labs PBC: captured 09 March 2026, accessed 11 March 2026) https://www.planet.com/explorer/.
```

AI model output:

```
Claude Opus 4.5, "Summary of open-source reporting on PLA joint logistics," *Claude.ai* [AI Model Output; prompt and full transcript on file; F6] (Anthropic: 12 March 2026).
```

## Handing sources to the generator

When the person you are working for asks for a source list file, give the sources as JSON in the shape below instead of formatting the footnotes yourself. They save it as a `.json` file and open it in the generator with **Open a list file**. The generator formats every footnote the same way, and its **Audit the list** button flags sources that need an archive copy, an access date, or another fix. This is the most reliable way to work, because the formatting is done by a program and a person reviews each source.

```json
{
  "app": "OSINT Citation Generator",
  "format": 2,
  "name": "Name of the piece",
  "sources": [
    {
      "id": "s1",
      "fields": {
        "type": "web",
        "titleStyle": "quotes",
        "authors": "Michael Kofman\nRob Lee",
        "title": "Not Built for Purpose: The Russian Military's Ill-Fated Force Design",
        "location": "War on the Rocks",
        "descType": "Defense Analysis Article",
        "date": "02 June 2022",
        "url": "https://warontherocks.com/2022/06/not-built-for-purpose-the-russian-militarys-ill-fated-force-design/"
      }
    },
    {
      "id": "s2",
      "fields": {
        "type": "social",
        "titleStyle": "quotes",
        "authors": "@example_monitor",
        "title": "Drone Footage Near the River Crossing",
        "location": "X",
        "descType": "Social Media Post",
        "date": "14 February 2026",
        "url": "https://x.com/example_monitor/status/1234567890",
        "archiveUrl": "https://archive.ph/example",
        "archiveDate": "14 February 2026"
      }
    }
  ]
}
```

Opened in the generator, those two sources become:

```
Michael Kofman and Rob Lee, "Not Built for Purpose: The Russian Military's Ill-Fated Force Design," *War on the Rocks* [Defense Analysis Article] (02 June 2022) https://warontherocks.com/2022/06/not-built-for-purpose-the-russian-militarys-ill-fated-force-design/.

@example_monitor, "Drone Footage Near the River Crossing," *X* [Social Media Post] (14 February 2026) https://x.com/example_monitor/status/1234567890. Archived: https://archive.ph/example (captured 14 February 2026).
```

The fields, all optional except `type`:

| Field | What it holds |
|---|---|
| `type` | One of the source types in the next table |
| `titleStyle` | `quotes`, `italics`, or `plain` (a description standing in for a missing title) |
| `lead` | `See`, `Cited in`, or `Quoted in` |
| `authors`, `editors`, `translators`, `contributors` | Names, one per line (separate with `\n`) |
| `title` | The title as the source gives it |
| `langMode` | `en`, `foreign` (not in English), or `published` (a published English translation) |
| `origLang`, `transTitle`, `transBy` | The language; the title in English; `own` or `machine` |
| `location` | Slot 3 |
| `descType` | The kind of source |
| `descDetails` | Details, separated by semicolons |
| `quals` | A list of qualifiers from the vocabulary above |
| `access` | A list of access notes from the vocabulary above |
| `rating` | A letter A to F and a number 1 to 6, or leave it out |
| `publisher` | Slot 5 |
| `date`, `dateKind`, `accessed` | The date; `updated` or `captured` if it is not a publication date; the date accessed |
| `url`, `archiveUrl`, `archiveDate` | The link; the archive copy; the date the copy was made |
| `locator` | Pages, section, or timestamp |
| `note` | Commentary that follows the citation |

Source types, and the title style each one starts with:

| `type` | Use for | Title in |
|---|---|---|
| `book` | Book | italics |
| `journal` | Journal article | quotes |
| `news` | News or magazine | quotes |
| `chapter` | Chapter or section | quotes |
| `web` | Website or think tank | quotes |
| `report` | Report or government document | italics |
| `social` | Social media post | quotes |
| `video` | Video or podcast | quotes |
| `archival` | Primary or archival | quotes |
| `live` | Live list or tracker | quotes |
| `imagery` | Satellite imagery | quotes |
| `ai` | AI model output | quotes |

Leave out any field you do not know. Do not fill a field with a guess so that the file looks complete.

A few points about the file:

- `name` is the name of the piece the sources belong to. Leave it as an empty string if you were not told.
- `locator` can be page numbers alone (`12-15`); the generator adds `p.` or `pp.` and the en dash. For a section or a timestamp, give the whole phrase (`See 10:15-12:00 for discussion of hull design`).
- For a source not in English, set `langMode` and `origLang` and the generator writes the language note in the description. Do not also put it in `descDetails`.
- `date`, `accessed`, and `archiveDate` take any common date form. The generator rewrites them.
- `note` is only for commentary that belongs in the footnote. Do not put the statement that the citations are unverified there. Say that in your reply.
- Give your "Needs checking" list in your reply alongside the file. The file does not replace it.

## License

The OSINT Style Guide content in this file is © 2026 G. Michael Rapp and licensed under Creative Commons Attribution 4.0 International: https://creativecommons.org/licenses/by/4.0/
