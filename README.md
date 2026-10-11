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

1. Pick a source type. Each one loads an example you can clear.
2. Fill in the slots. The footnote assembles as you type.
3. Read the checks under the footnote. They flag things like an empty description bracket, a link shortener, a social media post with no archive link, or a live tracker with no access date.
4. Copy the footnote with italics, as Markdown, or as plain text.

The tool does a few things for you:

- Dates typed in any common form become `DD Month YYYY`. Slashes are read as month/day/year.
- Page numbers get `p.` or `pp.` and an en dash.
- A bare DOI becomes a full `https://doi.org/` link.
- Four or more authors become the first three and `et al.`
- A publisher that repeats the location is dropped.
- It writes the short form and `Ibid.` for later citations of the same source.

The kind-of-source field searches a library of 770 descriptions in 16 categories. You can also type your own.

## Your data

The page runs entirely in your browser. It makes no network requests. What you type is kept in that browser's local storage on your device, so it is still there when you come back, and nothing is sent anywhere.

Clearing your browser's site data clears the form and the source list. Save the list to a file if you want to keep it.

## Source lists and files

Add sources to the list as you go, then copy them one per line or as a single footnote separated by semicolons.

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
  "format": 1,
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

`footnote` is there so the file can be read without the tool. Only `fields` is used when a file is opened, and the footnote is rebuilt from it.

## Examples in the tool

Each source type loads an example. Some are real, checkable sources. Those that use the names Jane Doe or John Doe, or an address containing `example`, are placeholders that show the form and do not point to anything. Ratings shown on examples illustrate where a rating goes. They are not assessments of those sources.

## Status

This is version 2.1 of the tool. It follows version 1.4 of the OSINT Style Guide and carries the draft Source Description Library and qualifier list from version 1.5, so in those two areas it runs ahead of the published guide.

Access notes in the bracket, such as `paywalled`, are a convention introduced with this tool.

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

## Suggesting a change

Open an issue if a description is missing from the library, a rule is applied wrongly, or a source type you cite often has no good fit. Say what you were citing and what you expected the footnote to look like.

## For maintainers

Everything is in `index.html`: markup, styles, and two scripts.

- `<script id="core">` holds the formatter. It has no dependence on the page, which is what lets the tests run it directly. `build()` assembles the footnote and the checks. The file formats (`listFile`, `parseListFile`, `docxBytes`, `csvText`, `mdText`) are here too.
- The second script is the page itself. Near its top are the tables you are most likely to edit:
  - `TYPES`: the source types, their default title style, suggested descriptions, placeholder text, and built-in example
  - `LIB`: the description library, grouped by category
  - `QUALIFIERS` and `ACCESS`: the tick-box vocabularies
  - `NEIGHBORS`: the notes that tell similar descriptions apart

The version number appears in two places in `index.html`: the label beside the page title and the footer.

### Tests

```
node Tests/run.js
```

This needs Node 18 or later and no packages. It checks every built-in example against its expected footnote, then the date and page rules, the short forms, saving and reopening a list, and the three exports. Run it after any change to the formatter or to an example. If you change an example in `TYPES`, update its expected footnote in `Tests/run.js` to match.

### Hosting

The page is a single static file, so any static host will serve it. On GitHub Pages, publish from the root of the main branch.
