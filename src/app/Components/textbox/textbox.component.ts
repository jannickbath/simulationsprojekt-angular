import { Component, Output, ViewEncapsulation } from '@angular/core';
import { Letter, Player } from '../../Types';
import { ValidatePipe } from '../../Pipes/validate.pipe';
import { PlayerService } from '../../Services/player.service';
import { GameService } from '../../Services/game.service';
import { PopupService } from '../../Services/popup.service';

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [ValidatePipe],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})

export class TextboxComponent {
  private _text: Array<Letter> = this.textToLetterArray("Lorem ipsum sit dolor amet.");
  private _cursorIndex: number = 0;
  private _reseted: boolean = false;

  private get _player() {
    return this.playerService.humanPlayer;
  }

  private get _running() {
    return this.gameService.running;
  }

  private get _progress() {
    return Math.floor(this._player ? this._player.progress : 0);
  }

  public get textHtml() {
    return this.letterArrayToHtml(this._text);
  }

  constructor(private playerService: PlayerService, private gameService: GameService, private popupService: PopupService) {
    gameService.tickEventEmitter.subscribe(() => this.handleGameTick());
  }

  private handleGameTick() {    
    if (!this._running) {
      if (!this._reseted) {
        this.resetPlayerProgress();
        this._reseted = true;
      }
    }else {
      if (this._progress === 100) {
        this.handleHumanWinner();
      }
      this._reseted = false;
    }
  }

  private handleHumanWinner() {
    this.popupService.addPopup("Game Over!", "You have won the game!");
    this.gameService.stop();
    setTimeout(() => this.gameService.resetBotProgress(), 1000);
  }

  private resetPlayerProgress() {
    this._text.forEach(letter => {
      letter.correct = false;
      letter.typed = false;
    })
    this._cursorIndex = 0;

    if (this._player) {
      this._player.progress = 0;
    }
  }

  public handleKeyDown = ($event: KeyboardEvent) => {
    if (!this._running) return;

    if ($event.key.length > 1) {
      if ($event.key === "Backspace") {
        this.handleBackspace();
      }
      return;
    }
    this.handleCharacterKey($event.key);
  }

  private handleBackspace() {
    const reversedText = [...this._text].reverse();
    const lastKey = reversedText.find(letterObj => letterObj.typed);
    if (lastKey) {
      lastKey.typed = false;
      lastKey.correct = false;
      this._cursorIndex--;
      this.updateProgress();
    }
  }

  private handleCharacterKey(eventKey: string) {
    const currentKey = this._text.find(letterObj => !letterObj.typed);
    if (!currentKey) return;

    if (eventKey === currentKey.content) {
      currentKey.correct = true;
    }else {
      currentKey.correct = false;
    }
    currentKey.typed = true;
    this._cursorIndex++;
    this.updateProgress();
  }

  private updateProgress() {
    const correctLetters = this._text.filter(letter => letter.correct);
    if (this._player) {
      this._player.progress = (correctLetters.length / this._text.length) * 100;
    }
  }

  private textToLetterArray(text: string): Array<Letter> {
    const textArr = text.split("");
    return textArr.map(letter => ({content: letter, correct: false, typed: false}))
  }

  private letterArrayToHtml(letterArray: Array<Letter>): string {
    return letterArray.map((letter, index) => {
      const cursorClass = index === this._cursorIndex ? " cursor" : "";

      if (letter.typed === false) {
        return `<span class='${cursorClass}'>` + letter.content + `</span>`;
      }else if (letter.correct) {
        return `<span class='correct${cursorClass}'>` + letter.content + `</span>`;
      }
      return `<span class='invalid${cursorClass}'>` + letter.content + `</span>`;
    }).join("");
  }
}
