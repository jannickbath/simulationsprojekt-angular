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