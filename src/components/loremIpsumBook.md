# loremIpsumBook

```js
import { loremIpsumBook } from 'lorem-ipsum-usfm';
import { UsfmEditor } from 'simple-text-editor-rcl';

const book = loremIpsumBook({
  bookCode: '1LI',
  bookName: '1 Lorem Ipsum',
  chapterMin: 1,
  chapterMax: 20,
  chapterBias: 5,
  // chapterCount: 3,
  paragraphChance: 0.3,
  paragraphStartChapter: true,
  verseMin: 1,
  verseMax: 100,
  verseBias: 10,
  rangeChance: 0.1,
  // verbose: true,
});

<UsfmEditor {...{ 
  text: book, 
  sectionable: false, 
  blockable: false, 
  editable: false,
  preview: false,
  headingComponent: () => (<></>),
  onSectionClick: () => {},
}} />;
```
