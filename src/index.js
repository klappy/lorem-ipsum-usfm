import { LoremIpsum } from 'lorem-ipsum';
import { getRandomInt } from './helpers/getRandomInt';
import { getRandomString } from './helpers/getRandomString';

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 2, min: 1 },
  wordsPerSentence: { max: 16, min: 2 },
});

export const loremIpsumPhrase = ({wordCount}) => {
  const phrase = lorem.generateWords(wordCount);
  return phrase;
};

export const paragraph = ({paragraphChance=0.5, verseNumber, paragraphStartChapter=false}) => {
  const isP = (paragraphStartChapter && verseNumber === 1) || (Math.random() < paragraphChance);
  return isP ? '\\p\n' : '';
};

export const section = ({sectionChance=1}) => {
  const loremSection = new LoremIpsum({
    wordsPerSentence: { max: 10, min: 2 },
  });
  const isS = Math.random() < sectionChance;
  return isS ? `\n\\s ${loremSection.generateSentences(1)}\n`: '';
};

export const footnote = ({footnoteChance=1}) => {
  const isF = Math.random() < footnoteChance;
  return isF ? `\\f ${lorem.generateSentences(2)}\\f*`: '';
};

export const loremIpsumVerse = ({verseNumber, paragraphChance, sectionChance=0.03, footnoteChance=0.07, paragraphStartChapter}) => {
  const verseText = lorem.generateParagraphs(1);
  const s = section({sectionChance});
  const p = paragraph({paragraphChance, verseNumber, paragraphStartChapter});
  const f = footnote({footnoteChance});
  return `${s}${p}\\v ${verseNumber} ${verseText} ${f}`;
};

export const loremIpsumVerses = ({verseMin=1, verseMax=150, verseBias=20, rangeChance=0.05, paragraphChance, sectionChance, footnoteChance, offset=1, paragraphStartChapter}) => {
  const count = getRandomInt(verseMin, verseMax, verseBias);
  let verses = [];
  for (let index=0; index < count; index++) {
    let verseNumber;
    const isRange = Math.random() < rangeChance;
    if (isRange) {
      const rangeLength = getRandomInt(2, 5, 2) || 2;
      const startVerse = offset + index;
      const endVerse = startVerse + rangeLength;
      verseNumber = `${startVerse}-${endVerse}`;
      index = index + rangeLength;
    } else {
      verseNumber = offset + index;
    }
    verses[index] = loremIpsumVerse({verseNumber, paragraphChance, sectionChance, footnoteChance, paragraphStartChapter});
  };
  return verses.join('\n');
};

export const loremIpsumChapter = ({chapterNumber, paragraphStartChapter, paragraphChance, sectionChance, footnoteChance, verseMin, verseBias, verseMax, rangeChance, verbose}) => {
  const paragraphs = loremIpsumVerses({paragraphStartChapter, verseMin, verseBias, verseMax, rangeChance, paragraphChance, sectionChance, footnoteChance, verbose});
  const chapter = `${section({sectionChance: 0.5})}\\c ${chapterNumber}\n${paragraphs}`;
  if (verbose) console.log('loremIpsumChapter()', chapter);
  return chapter;
}

export const loremIpsumChapters = ({chapterCount, chapterMin=1, chapterMax=200, chapterBias=5, paragraphStartChapter, paragraphChance, sectionChance, footnoteChance, verseMin, verseBias, verseMax, rangeChance, verbose}) => {
  const count = chapterCount || getRandomInt(chapterMin, chapterMax, chapterBias);
  const chapters = [];
  for (let index=0; index < count; index++) {
    const chapterNumber = index + 1;
    const chapter = loremIpsumChapter({chapterNumber, paragraphStartChapter, paragraphChance, sectionChance, footnoteChance, verseMin, verseBias, verseMax, rangeChance, verbose});
    chapters[index] = chapter;
  };
  if (verbose) console.log('loremIpsumChapters()', chapters);
  return chapters.join('\n\n');
};

export const loremIpsumHeaders = ({bookCode: _bookCode, bookName: _bookName, verbose}) => {
  const bookCode = _bookCode || getRandomString(3);
  const bookName = _bookName || loremIpsumPhrase({wordCount: 1});
  const toc1 = `${loremIpsumPhrase({wordCount: 2})} ${bookName}`
  const headers = `\\id ${bookCode.toUpperCase()}
\\ide UTF-8
\\h ${bookName}
\\toc1 ${toc1}
\\toc2 ${bookName}
\\toc3 ${bookCode}
\\mt ${bookName}`;
  if (verbose) console.log('loremIpsumHeaders()', headers);
  return headers;
};

export const loremIpsumBook = ({bookCode, bookName, chapterCount, chapterMin, chapterMax, chapterBias, paragraphStartChapter, paragraphChance, sectionChance, footnoteChance, verseMin, verseMax, verseBias, rangeChance, verbose}) => {
  const headers = loremIpsumHeaders({bookCode, bookName, verbose});
  const chapters = loremIpsumChapters({chapterCount, chapterMin, chapterMax, chapterBias, paragraphStartChapter, paragraphChance, sectionChance, footnoteChance, verseMin, verseMax, verseBias, rangeChance, verbose});
  const book = `${headers}\n\n${chapters}`;
  if (verbose) console.log('loremIpsumBook()', book);
  return book;
};
