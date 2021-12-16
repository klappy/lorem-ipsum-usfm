# Lorem Ipsum USFM

This is a Lorem Ipsum generator for creating dummy placeholder .usfm files. USFM is a file format for scripture markup. Each file contains a single book of scripture.

Comes in handy while testing libraries that require USFM files but it's a pain to go download and import one in your app or library.

## Limitations

Overtime this will generate more complex USFM files.

Implemented:

- Headers:
  - \id, \ide
  - \h
  - \toc1, \toc2, \toc3
  - \mt
- \c (chapter)
- \v (verse)
- \p (paragraph)
- \s (section)
- \f...\f* (footnote)

Planned:

- \fe, \fr, \fq, \fqa, \fk, \fl, \fw, \fp, \fv, \ft, \fdc, \fm (footnotes)
- \x, \xo, \xk, \xq, \xt (cross-references)