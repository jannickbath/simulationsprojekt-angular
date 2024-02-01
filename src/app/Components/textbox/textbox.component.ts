import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Item, Letter } from '../../Types';
import { ValidatePipe } from '../../Pipes/validate.pipe';
import { PlayerService } from '../../Services/player.service';
import { GameService } from '../../Services/game.service';
import { PopupService } from '../../Services/popup.service';
import { QuotableService } from '../../Services/quotable.service';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../Services/item.service';
import { Helper } from '../../Helper';

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [ValidatePipe, CommonModule],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})

export class TextboxComponent {
  private _cursorIndex: number = 0;

  private get _player() {
    return this.playerService.humanPlayer;
  }

  private get _progress() {
    return Math.floor(this._player ? this._player.progress : 0);
  }

  private _reseted: boolean = false;
  private _text: Array<Letter> = [];
  @ViewChild("textbox") private textbox!: ElementRef;
  public handleKeyDown = ($event: KeyboardEvent) => {
    if (!this.running) return;

    if ($event.key.length > 1) {
      if ($event.key === "Backspace") {
        this.handleBackspace();
      }
      return;
    }
    $event.preventDefault();
    this.handleCharacterKey($event.key);
  }

  public get running() {
    return this.gameService.running;
  }

  public get textHtml() {
    return this.letterArrayToHtml(this._text);
  }

  constructor(private playerService: PlayerService, private gameService: GameService, private popupService: PopupService, private quotableService: QuotableService, private itemService: ItemService) {
    gameService.tickEventEmitter.subscribe(() => this.handleGameTick());
  }

  private fetchQuote() {
    this._text = []; // initiate loading animation
    this.quotableService.getQuote().subscribe(QResponse => {
      this._text = this.textToLetterArray(QResponse[0].content);
      this.gameService.fetchedText = QResponse[0].content;
    })
  }

  private addPenaltyTextForHuman() {
    this.quotableService.getQuote(40).subscribe(QResponse => {
      const fetchedTextLetterArray = this.textToLetterArray(QResponse[0].content);
      const space = this.textToLetterArray(" ");
      this._text = [...this._text, ...space, ...fetchedTextLetterArray]
    })
  }

  private getPlayerItems() {
    const humanPlayer = this.playerService.humanPlayer;
    let playerItems: Array<Item> = [];

    if (humanPlayer) {
      playerItems = this.itemService.items.filter(item => item.targetId === humanPlayer.id);
    }

    return playerItems;
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

  private handleGameTick() {
    if (!this.gameService.ranSetup) return;

    if (!this.running) {
      if (!this._reseted) {
        this.resetPlayerProgress();
        this.fetchQuote();
        this._reseted = true;
      }
    }else {
      if (this._progress === 100) {
        this.handleHumanWinner();
      }else {
        // Spawn items
        const humanPlayer = this.playerService.humanPlayer;
        if (humanPlayer) {
          const likelihood = (this._progress / 100) / 3;
          if (Helper.randomBooleanWithLikelihood(likelihood)) {
            this.itemService.addItem(humanPlayer.id, "barrier", this._progress + 5);
          }
        }
        
        // Activate items
        const playerItems = this.getPlayerItems();
        playerItems.forEach(item => {
          if (this._progress >= item.position) {
            if (item.type === "barrier") {
              this.addPenaltyTextForHuman();
              this.itemService.removeItem(item.id);
            }
          }
        })
      }
      this._reseted = false;
    }
  }

  private handleHumanWinner() {
    this.popupService.addPopup("Game Over!", "You have won the game!");
    this.gameService.running = false;
    setTimeout(() => this.gameService.resetBotProgress(), 1000);
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

  private textToLetterArray(text: string): Array<Letter> {
    const textArr = text.split("");
    return textArr.map(letter => ({content: letter, correct: false, typed: false}))
  }

  private updateProgress() {
    const correctLetters = this._text.filter(letter => letter.correct);
    if (this._player) {
      this._player.progress = (correctLetters.length / this._text.length) * 100;
    }
  }

  public focusTextbox() {
    this.textbox.nativeElement.focus();
  }
}
