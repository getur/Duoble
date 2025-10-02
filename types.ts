export type View = 'home' | 'learn' | 'memorize' | 'profile';

export interface ParsedVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBook {
    name: string;
    testament: 'Old' | 'New';
    category: string;
}