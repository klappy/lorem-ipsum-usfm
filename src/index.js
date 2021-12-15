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

export const paragraph = ({paragraphChance=0.5, verseNumber}) => {
  const isP = (verseNumber === 1) || (Math.random() < paragraphChance);
  return isP ? '\\p\n' : '';
};

export const loremIpsumVerse = ({verseNumber, paragraphChance}) => {
  const verseText = lorem.generateParagraphs(1);
  const p = paragraph({paragraphChance, verseNumber});
  return `${p}\\v ${verseNumber} ${verseText}`;
};

export const loremIpsumVerses = ({verseMin=1, verseMax=150, verseBias=20, paragraphChance, offset=1}) => {
  const count = getRandomInt(verseMin, verseMax, verseBias);
  let verses = [];
  for (let index=0; index < count; index++) {
    const verseNumber = offset + index;
    verses[index] = loremIpsumVerse({verseNumber, paragraphChance});
  };
  return verses.join('\n');
};

export const loremIpsumChapter = ({chapterNumber, paragraphChance, verseMin, verseBias, verseMax, verbose}) => {
  const paragraphs = loremIpsumVerses({verseMin, verseBias, verseMax, paragraphChance, verbose});
  const chapter = `\\c ${chapterNumber}\n\n${paragraphs}`;
  if (verbose) console.log('loremIpsumChapter()', chapter);
  return chapter;
}

export const loremIpsumChapters = ({chapterCount, chapterMin=1, chapterMax=200, chapterBias=5, paragraphChance, verseMin, verseBias, verseMax, verbose}) => {
  const count = chapterCount || getRandomInt(chapterMin, chapterMax, chapterBias);
  const chapters = [];
  for (let index=0; index < count; index++) {
    const chapterNumber = index + 1;
    const chapter = loremIpsumChapter({chapterNumber, paragraphChance, verseMin, verseBias, verseMax, verbose});
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

export const loremIpsumBook = ({bookCode, bookName, chapterCount, chapterMin, chapterMax, chapterBias, paragraphChance, verseMin, verseMax, verseBias, verbose}) => {
  const headers = loremIpsumHeaders({bookCode, bookName, verbose});
  const chapters = loremIpsumChapters({chapterCount, chapterMin, chapterMax, chapterBias, paragraphChance, verseMin, verseMax, verseBias, verbose});
  const book = `${headers}\n\n${chapters}`;
  if (verbose) console.log('loremIpsumBook()', book);
  return book;
};
