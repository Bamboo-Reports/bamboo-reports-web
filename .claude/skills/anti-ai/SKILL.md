---
name: anti-ai
description: Review informational prose, Wikipedia edits, drafts, comments, and wikitext for possible LLM-assisted writing signals and the underlying quality problems they may indicate. Use when asked to detect, audit, humanize, or clean up AI-like text. Treat signals as clues rather than proof, verify content and citations, and preserve accurate human writing that merely shares a pattern.
---

# Anti-AI writing review

Use this skill as a cautious editorial review method, especially for Wikipedia-like content. The goal is not to make text evade detection. The goal is to identify unsupported claims, generic or promotional prose, fabricated or malformed citations, poor markup, and other risks that often accompany unreviewed LLM output.

## Core rule

No single stylistic feature proves AI authorship. Do not accuse an author or recommend deletion from style alone. Separate:

1. **Signals** — wording, formatting, or workflow clues.
2. **Defects** — verifiable problems in accuracy, sourcing, neutrality, relevance, or markup.
3. **Evidence** — revision history, source checks, author explanation, or disclosure.

When reporting findings, describe the signal and its concrete editorial consequence. Prefer “This sentence makes an unsupported causal claim” over “This sounds like AI.”

## Review workflow

1. **Establish context.** Identify the genre, intended audience, date, author, markup language, and whether the text is a Wikipedia article, draft, talk comment, edit summary, or ordinary prose. Older model habits are weaker evidence for newer text, and Wikipedia-specific clues do not transfer cleanly to fiction or casual writing.
2. **Read for substance first.** Check whether each important claim is relevant, specific, neutral, verifiable, and supported by an appropriate source. Look for invented details, source–claim mismatches, synthesis, plagiarism/copyright concerns, and promotional framing.
3. **Scan for clusters of signals.** Use the categories below. A cluster is a reason to inspect more closely, not a verdict.
4. **Verify independently.** Open citations and links, inspect revision history when available, validate DOI/ISBN and access dates, and check that cited sources actually support the nearby statement. Run markup validation or preview wikitext where possible.
5. **Explain or remediate.** Remove unsupported analysis, puffery, repetition, malformed markup, and citation errors; replace vague language with sourced facts. Escalate unresolved policy or authorship concerns to the relevant human reviewer.
6. **Report confidence.** State what was observed, what was verified, what remains uncertain, and the smallest safe action.

## Signal categories

### Content and reasoning

- Inflated claims about significance, legacy, impact, symbolism, “broader trends,” “evolving landscapes,” or pivotal moments—especially for mundane facts.
- Repeated claims that a person or organization is notable, widely covered, influential, or maintains an “active social media presence,” with source-type labels doing more work than the sources themselves.
- Superficial analysis appended to factual sentences: “highlighting,” “underscoring,” “reflecting,” “contributing to,” “fostering,” or “ensuring” something without a source or clear mechanism.
- Generic ecosystem, conservation, cultural, or societal implications added to biology, geography, infrastructure, or local-history topics without topic-specific evidence.
- Promotional or advertisement-like language: leading, renowned, vibrant, rich, world-class, commitment to excellence, seamless, dynamic, or similar praise.
- Vague attributions (“experts say,” “critics note,” “has been described as”) and broad claims about debates, discussions, or public reaction without named, relevant sources.
- Outline-like “challenges,” “future prospects,” or “opportunities” sections that speculate beyond the available evidence.
- Treating a list name, article title, or category as if it were a proper noun or established entity.

### Language and structure

- Dense, repetitive use of fashionable or abstract vocabulary; do not rely on a word blacklist in isolation.
- Avoidance of simple “is/are” constructions in favor of ornate phrasing.
- Negative parallelism and formulaic contrasts: “not just X, but also Y,” “not X, but Y,” or “X rather than Y.”
- Repeated groups of three adjectives, clauses, or abstract nouns.
- Lexical variety used for its own sake, replacing the same precise term with elegant but less accurate alternatives.
- Excessive transitions, section summaries, “in conclusion,” “in summary,” or didactic disclaimers such as “it is important to note.”
- Unnatural shifts in register, voice, specificity, or grammatical quality within one contribution.

### Formatting and markup

- Title Case headings where sentence case is expected; excessive boldface; emoji used as structure; decorative thematic breaks before headings; skipped heading levels.
- Inline headers used to create vertical lists instead of normal bullets or prose; tables used where a simple list would be clearer.
- Overuse of em dashes, curly quotation marks/apostrophes, or Markdown conventions inside wikitext.
- Broken wikitext, Markdown code fences around wikitext, hallucinated templates/categories, out-of-place categories, unexplained `:::writing`, and artifacts such as `turn0search0`.
- Invalid reference fields or generated artifacts such as `contentReference`, `oaicite`, `oai_citation`, `attached_file`, `grok_card`, `attribution`, or `attributableIndex`.
- Search-result URLs presented as sources, broken external links, `utm_source=` tracking parameters, invalid DOI/ISBN values, DOI links to unrelated works, missing page numbers in book citations, unused named references, and implausibly stale access dates.

### Interaction and workflow

- Canned collaborative language, submission statements, exhaustive edit summaries, pre-placed maintenance templates, canned user pages, or attempts to game permissions.
- Knowledge-cutoff disclaimers, speculation about missing sources, placeholder prose, abrupt cutoffs, or old-style “as an AI language model” refusals.
- A pronounced style shift between the author’s surrounding contributions and the reviewed text. Treat this as a prompt to inspect history, not as authorship proof.

## Human-writing counterchecks

Do not over-flag text merely because it is polished, well formatted, heavily cited, or uses common transitions. Text is less suspicious when the author can explain editorial choices, sources, and revisions; when syntax is naturally varied; or when the text clearly predates the relevant model era. Human writing can contain every individual signal listed above.

AI detectors and human intuition are unreliable, and paraphrasing or formatting changes can fool detectors. Never use a detector score as the sole basis for an accusation, deletion, or disciplinary action.

## Output format

For a review, return:

- **Overall assessment:** low, medium, or high concern, with a sentence explaining that this is not an authorship determination.
- **Observed signals:** quote or locate only the necessary examples and group them by category.
- **Verified defects:** list concrete factual, sourcing, neutrality, relevance, markup, or copyright problems.
- **Recommended action:** edit, source-check, request clarification/disclosure, inspect history, or escalate; explain why.
- **Uncertainty:** note plausible human explanations and anything you could not verify.

For a cleanup request, make the smallest evidence-based edits, retain supported substance, and show any citation or markup changes clearly. Do not “humanize” text by randomly adding errors, slang, or superficial synonym swaps.
