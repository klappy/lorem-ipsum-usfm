# loremIpsumBook

```js
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const book = loremIpsumBook({
  bookCode: '1LI',
  bookName: '1 Lorem Ipsum',
  chapterMin: 1,
  chapterMax: 20,
  chapterBias: 5,
  // chapterCount: 3,
  paragraphChance: 0.3,
  verseMin: 1,
  verseMax: 100,
  verseBias: 10,
  // verbose: true,
});

<pre style={{ maxHeight: '300px', overflow: 'scroll'}}>
  {book}
</pre>;
```
