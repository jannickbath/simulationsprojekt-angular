export type Letter = {
  content: string;
  correct: boolean;
  typed: boolean;
}

export type Player = {
  id: number;
  name: string;
  progress: number;
  human: boolean;
}

export type Popup = {
  id: number;
  headline: string;
  description: string;
}

/**
 * Response from https://api.quotable.io/random API
 * @see https://docs.quotable.io/docs/api/ZG9jOjQ2NDA2-introduction For further documentation
 */
export type QuotableApiResponse = {
  /**
   * Unique identifier for the quote.
   * @example "eJC3Bf-J2fe"
   */
  _id: string;

  /**
   * The actual quote.
   * @example "The future belongs to those who believe in the beauty of their dreams."
   */
  content: string;

  /**
   * The author of the quote.
   * @example "Eleanor Roosevelt"
   */
  author: string;

  /**
   * Tags categorizing the quote.
   * @example ["Future", "Wisdom"]
   */
  tags: Array<string>;

  /**
   * A slug representing the author.
   * @example "eleanor-roosevelt"
   */
  authorSlug: string;

  /**
   * The length of the quote in characters.
   * @example 70
   */
  length: number;

  /**
   * The date when the quote was added to the database.
   * @example "2020-03-27"
   */
  dateAdded: string;

  /**
   * The date when the quote was last modified.
   * @example "2023-04-14"
   */
  dateModified: string;
}