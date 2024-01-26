import { Injectable } from '@angular/core';
import { Letter } from '../Types';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})

export class TextService {
  private _text: Array<Letter> = this.textToLetterArray("Lorem ipsum sit dolor amet.");

  constructor(private playerService: PlayerService) { }

  private get _player() {
    return this.playerService.humanPlayer;
  }

  public get text() {
    return this._text;
  }

  private textToLetterArray(text: string): Array<Letter> {
    const textArr = text.split("");
    return textArr.map(letter => ({content: letter, correct: false, typed: false}))
  }

  public updateProgress() {
    const correctLetters = this._text.filter(letter => letter.correct);
    if (this._player) {
      this._player.progress = (correctLetters.length / this._text.length) * 100;
    }
  }
}
