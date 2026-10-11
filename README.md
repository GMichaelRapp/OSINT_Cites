# OSINT Citation Generator

A fill-in-the-blanks tool that builds footnotes in the form set out by the OSINT Style Guide. You pick a source type, fill in the slots, and copy a finished footnote with its punctuation, italics, and description bracket already in place.

It is one web page. There is nothing to install, no account, and no server.

## The citation form

The OSINT Style Guide is a footnote system for open-source research. Every footnote is built from the same eight slots:

```
Author, "Title," Location [Description] (Publisher: Date) URL/DOI: Locator.
```

Short works take quotation marks and larger works take italics. The location is always italic. A slot that does not apply is dropped along with its punctuation.

The bracketed description is what sets the form apart. It tells the reader what kind of source they are about to open, and it can also carry:

- details such as volume, issue, or report number
- qualifiers about this copy of the source, such as `leaked` or `preprint`
- anything standing between the reader and the source, such as `paywalled`
- an optional two-part rating: a letter A to F for the reliability of the source and a number 1 to 6 for the credibility of the information

A finished footnote looks like this:

> Michael Kofman and Rob Lee, "Not Built for Purpose: The Russian Military's Ill-Fated Force Design," *War on the Rocks* [Defense Analysis Article; B2] (02 June 2022) https://warontherocks.com/2022/06/not-built-for-purpose-the-russian-militarys-ill-fated-force-design/.

## Using it

Open `index.html` in any current browser, or use the hosted copy linked in this repository's About box.

1. Paste a link into "Start from a link" if the source has one, or pick a source type yourself. Each type loads an example you can clear.
2. Fill in the remaining slots. The footnote assembles as you type.
3. Read the checks under the footnote. They flag things like an empty description bracket, a link shortener, a social media post with no archive link, or a live tracker with no access date.
4. Copy the footnote with italics, as Markdown, or as plain text.

The tool does a few things for you:

- Dates typed in any common form become `DD Month YYYY`. Slashes are read as month/day/year.
- Page numbers get `p.` or `pp.` and an en dash.
- A bare DOI becomes a full `https://doi.org/` link.
- Four or more authors become the first three and `et al.`
- A publisher that repeats the location is dropped.
- It writes the short form and `Ibid.` for later citations of the same source.

Every part of the page has a **?** beside it. Point at it, tap it, or press F1 while you are in a field, and it explains what that part is for and what to put there.

### Choosing the kind of source

The kind-of-source field opens a list of all 771 descriptions in 16 categories.

- **Browse** shows the descriptions most used for the source type you picked, then the whole library by category. Click a category to open it.
- Typing searches the library. Everyday words work as well as the library's own terms: `tweet` finds Social Media Post, `study` finds Peer-Reviewed Article and Journal Article, `telegram` finds Channel Post.
- Pointing at a description, or moving to it with the arrow keys, shows its category and how it differs from its neighbors.
- If nothing fits, keep your own wording in ten words or fewer.

### Journal articles and review status

For a journal article the tool asks for the **review status of the journal**, so the bracket tells the reader whether anyone refereed the work.

| Status you choose | What the bracket says |
|---|---|
| Peer-reviewed | `[Peer-Reviewed Article]` |
| Editor-reviewed | `[Journal Article; editor-reviewed]` |
| Student-edited | `[Journal Article; student-edited]` |
| Not peer-reviewed | `[Journal Article; not peer-reviewed]` |
| Could not establish | `[Journal Article; review status unclear]` |

Check the journal's own statement, usually under About or For Authors. A Journal Article with no status is flagged by the checks and by the list audit. Other journal descriptions, such as Review Article or Law Review Article, keep their name and take the status as a qualifier.

### Books: Monograph or Trade Book

Look at the publisher and the back of the book. A university or academic press, with notes and a bibliography, written for specialists, is a Monograph. A commercial house, written for general readers, is a Trade Book, even when a scholar wrote it. If you cannot tell, use Trade Book. The checks leave a note when the description and the publisher point different ways, such as a Trade Book from a university press.

### Social media posts

A post has no headline. Use its opening words exactly as written, about a dozen, and end with an ellipsis if you stop short. When a title runs past fifteen words, **Cut to the opening words** does this for you. If the post has no text, describe it in a few plain words and set the title as Plain.

### Starting from a link

Paste a link and choose **Fill from link**. The tool reads the address itself, without visiting it, and fills in what the address shows:

- the source type and platform, for the major social and video sites and for about 100 news outlets, think tanks, government sites, and trackers
- the account or channel handle
- the date. For posts on X, TikTok, Bluesky, and Discord it is decoded from the post's ID and given in UTC. For articles it is read from the path where the path carries one.
- a timestamp on a YouTube link, which becomes the locator
- coordinates in a Google Maps link
- for a Wayback Machine or archive.today link, both the archive copy with its capture date and the original address inside it

Share and tracking parameters are removed from the link. Fields you have already filled are left alone. A link does not carry a title, so the title is always yours to add, and a handle is not always the account's display name.

### Archive copies

Under the link field, **Wayback Machine** and **archive.today** open that archive in a new tab and hand it the link, so you can make a copy at the moment you cite. **Look for existing copies** opens the Wayback Machine's list for the link. When you paste the archive's address back, the capture date fills in: from the address if it carries one, otherwise today.

### Editors, translators, and contributors

Each role has its own field under Authors, so a source can carry all three. They follow the authors after a semicolon, with every name tagged: `Author; Editor (ed.), Translator (trans.), and Contributor (contr.)`.

### Sources not in English

Under the title, **Language of the source** has three settings:

| Setting | What you enter | What the footnote gets |
|---|---|---|
| English | Nothing more | Nothing more |
| Another language | The language, the title in English, and how you read it: in the original, through your own translation, or through machine translation | The English title in brackets after the original title, and wording such as `original in Chinese` or `machine translation; original in Russian` in the description bracket |
| A published English translation | The language it was translated from, and the translator under Translators | `translated from Russian` in the description bracket, and the translator credited with `(trans.)` |

A line under the fields says what the setting adds. For Chinese, Cyrillic-script languages, Japanese, and Korean it also names the romanization standard the guide uses for names.

### Light and dark

The Theme switch at the top right offers Auto, Light, and Dark. Auto follows your device. Your choice is remembered in that browser.

## Your data

The page runs entirely in your browser and makes no network requests of its own. What you type is kept in that browser's local storage on your device, so it is still there when you come back.

There is one way a link leaves the page: the archive buttons open the archive site you choose in a new tab and hand it the link you entered. Nothing else is sent anywhere.

Clearing your browser's site data clears the form and the source list. Save the list to a file if you want to keep it.

## Source lists and files

Add sources to the list as you go, then copy them one per line or as a single footnote separated by semicolons.

**Audit the list** runs every check across the whole list before you publish. It names each source that needs a fix or a second look, such as a volatile source with no archive copy, a live source with no access date, or a rating that cannot carry a claim alone. It also catches two things no single source can show: the same link cited twice, and two sources whose short forms cannot be told apart. Click a source number to open it in the form.

**Save list to a file** writes a `.json` file holding every field of every source. **Open a list file** loads it back with every source still editable, on any computer. If the list already has sources in it, you choose whether to add the file's sources or replace the list.

In Chrome and Edge the file you save to or open stays linked, and each later change to the list is written to it automatically. Emptying the list unlinks the file and leaves its contents alone. In Firefox and Safari each save downloads a fresh copy.

You can also export the footnotes as:

| Format | What you get |
|---|---|
| Word (`.docx`) | A numbered list of footnotes with italics, or underlining if that is the setting |
| Markdown (`.md`) | The same numbered list as plain text with `*italics*` |
| Spreadsheet (`.csv`) | One row per source, with a column for each field and the finished footnote |

### The list file format

```json
{
  "app": "OSINT Citation Generator",
  "format": 2,
  "name": "Name of the piece",
  "savedAt": "2026-10-10T23:10:00.000Z",
  "sources": [
    {
      "id": "1791674258-123456",
      "footnote": "The finished footnote, with *asterisks* for italics",
      "fields": { "type": "news", "authors": "Jane Doe", "title": "…" }
    }
  ]
}
```

`footnote` is there so the file can be read without the tool. Only `fields` is used when a file is opened, and the footnote is rebuilt from it. Files saved by earlier versions still open; names from the old combined editors, translators, and contributors box are moved into the three separate fields.

## Examples in the tool

Each source type loads an example. Some are real, checkable sources. Those that use the names Jane Doe or John Doe, or an address containing `example`, are placeholders that show the form and do not point to anything. Ratings shown on examples illustrate where a rating goes. They are not assessments of those sources.

## Status

This is version 3.2 of the tool. It follows version 1.4 of the OSINT Style Guide and carries the draft Source Description Library and qualifier list from version 1.5, so in those two areas it runs ahead of the published guide.

Some conventions were introduced with this tool and are not yet in the published guide:

- access notes in the bracket, such as `paywalled`
- `translated from …` for a published translation
- the description Journal Article, used with a review-status qualifier when a journal is not peer-reviewed or its review could not be established
- the default of Trade Book when a book could be either a Monograph or a Trade Book
- the opening words of a social media post as its title

The tool also lets a chapter's containing volume run past the guide's ten-word limit on locations, since a title cannot be shortened.

## License

© 2026 G. Michael Rapp. Two licenses apply.

| What | License | Full terms |
|---|---|---|
| The software: the page's markup, styles, and scripts, and the test script | MIT | `LICENSE-MIT` |
| The guide content the page carries: the citation rules, the description library, the qualifier and access lists, and the written guidance | [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0) | `LICENSE-CC-BY-4.0` |

In short:

- You may use, change, and redistribute the code for any purpose, as long as the copyright and license notice stay with it.
- You may copy and adapt the guide content, including commercially, as long as you give credit, link to the license, and say whether you made changes.

A suitable credit line for the guide content:

> OSINT Citation Generator by G. Michael Rapp, https://github.com/gmichaelrapp/OSINT_Cites, licensed under CC BY 4.0.

## For AI assistants

`osint-citation-spec.md` is the citation form written out as instructions an AI assistant can follow. Give your assistant the file, or its address, and ask it to cite that way:

https://gmichaelrapp.github.io/OSINT_Cites/osint-citation-spec.md

The file tells the assistant to cite only sources it actually opened, never to guess a missing detail, and not to assign ratings. It also describes how to hand sources to this tool as a list file, so that the tool does the formatting and a person runs the audit and checks each link. Every example footnote in the file was produced by the tool.

## Suggesting a change

Open an issue if a description is missing from the library, a rule is applied wrongly, or a source type you cite often has no good fit. Say what you were citing and what you expected the footnote to look like.

## For maintainers

Everything is in `index.html`: markup, styles, and two scripts.

- `<script id="core">` holds the formatter. It has no dependence on the page, which is what lets the tests run it directly. `build()` assembles the footnote and the checks. `readLink()` reads a pasted link, using the `SITES` table of known hosts, and `auditList()` checks a whole list. The file formats (`listFile`, `parseListFile`, `docxBytes`, `csvText`, `mdText`) are here too.
- The second script is the page itself. Near its top are the tables you are most likely to edit:
  - `TYPES`: the source types, their default title style, suggested descriptions, placeholder text, and built-in example. A type can also carry `advice` (shown under the kind-of-source field) and `titleHint` (shown under the title).
  - `LIB`: the description library, grouped by category
  - `QUALIFIERS` and `ACCESS`: the tick-box vocabularies
  - `NEIGHBORS`: the notes that tell similar descriptions apart
  - `ALIASES`: the everyday words that the search understands, each pointing at one or more library descriptions
  - `TIPS`: the text behind each **?**, paired with the part of the page it belongs to

The version number appears in two places in `index.html`: the label beside the page title and the footer.

### Tests

```
node Tests/run.js
```

This needs Node 18 or later and no packages. It checks every built-in example against its expected footnote, then the date and page rules, the short forms, saving and reopening a list, the three exports, link reading, the list audit, the three roles, the language settings, and the checks for journals, books, and social posts. It also confirms that every suggested description and every search word points at a real library entry, and that every tip belongs to a part of the page. Run it after any change to the formatter, an example, or one of the tables. If you change an example in `TYPES`, update its expected footnote in `Tests/run.js` to match. If you add or remove a library description, update the count in `Tests/run.js` and in the page footer.

### Hosting

The page is a single static file, so any static host will serve it. On GitHub Pages, publish from the root of the main branch.
