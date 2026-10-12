# Changelog

Changes to the OSINT Citation Generator, newest first. Version 3.2.1 follows version 1.5 of the OSINT Style Guide.

## 3.2.1 — 12 October 2026

A maintenance release. Nothing about how footnotes are built has changed.

- Follows version 1.5 of the OSINT Style Guide, which adopted the conventions this tool introduced: the order inside the bracket, access notes, language notes, Journal Article with a review status, the Monograph and Trade Book rule, and post titles.
- The page footer links to the instructions for AI assistants (`osint-citation-spec.md`) and to this changelog.
- The tests run on GitHub whenever a change is pushed.
- Issue forms for a missing description and for a footnote problem.
- List file format 2 is declared stable: files saved in it will keep opening in later versions.

## 3.2 — 11 October 2026

- The kind-of-source field opens a list of the whole library: the descriptions suggested for the source type first, then 16 categories to browse. Typing searches it, and everyday words such as `tweet` or `study` find the right description.
- Review status for journal articles, with the new description Journal Article (771 descriptions in all).
- Advice on the title of a social media post, and a button that cuts a long post to its opening words.
- Advice on choosing between Monograph and Trade Book, with notes when the publisher points the other way.
- A ? beside every part of the page explains it. F1 in a field shows the same tip.

## 3.1

- Separate fields for editors, translators, and contributors.
- Language of the source: English, another language, or a published English translation, with the language notes written for you.
- Light and dark themes.
- Added after release: `osint-citation-spec.md`, the citation form written as instructions for AI assistants.

## 3.0

- Start from a link: the source type, platform, account, and date are read from the address, including post dates decoded from post IDs on X, TikTok, Bluesky, and Discord.
- Archive buttons for the Wayback Machine and archive.today, with the capture date filled in.
- Audit the list: every check across a whole source list, plus repeated links and short forms that cannot be told apart.

## 2.1

- Save a source list to a file and open it again, with linked auto-save in Chrome and Edge.
- Export the footnotes to Word, Markdown, or a spreadsheet.
- First version published on GitHub, under the MIT License for the code and CC BY 4.0 for the guide content.

## 2.0

- The draft Source Description Library of 770 descriptions, browsable by category.
- Access notes as tick boxes that can be combined, and a panel of qualifiers.
- New checks for retracted, unverified, synthetic, leaked, and state-media sources.

## 1.0

- The first fill-in generator: eight slots, the source rating matrix, checks against the guide, later citations, and copying with italics.
