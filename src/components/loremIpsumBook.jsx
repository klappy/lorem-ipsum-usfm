import PropTypes from 'prop-types';

export default function loremIpsumBook(props) {
  return (<></>);
};

loremIpsumBook.propTypes = {
  /** bookCode for headers. */
  bookCode: PropTypes.string,
  /** bookName for headers. */
  bookName: PropTypes.string,
  /** Number of chapters. */
  chapterCount: PropTypes.number,
  /** Likelihood of paragraphs breaking up verses. */
  paragraphChance: PropTypes.number,
  /** Number of verses per chapter, overrides verseMax. */
  verseCount: PropTypes.number,
  /** Min number of verses per chapter. */
  verseMin: PropTypes.number,
  /** Max number of verses per chapter. */
  verseMax: PropTypes.number,
  /** Bias the number of verses per chapter. */
  verseBias: PropTypes.number,
  /** console log details. */
  verbose: PropTypes.bool,
};

loremIpsumBook.defaultProps = {
  // bookCode: '1LI',
  // bookName: '1 Lorem Ipsum',
  // chapterCount: 50,
  chapterMin: 1,
  chapterMax: 200,
  chapterBias: 5,
  paragraphChance: 0.5,
  verseMin: 1,
  verseMax: 150,
  verseBias: 20,
  verbose: false,
};