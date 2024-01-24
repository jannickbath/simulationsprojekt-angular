import { Component, ViewEncapsulation } from '@angular/core';
import { Letter } from '../../Types';
import { ValidatePipe } from '../../Pipes/validate.pipe';

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

  public handleKeyDown = ($event: KeyboardEvent) => {
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
  }

  get textHtml() {
    return this.letterArrayToHtml(this._text);
  }

  private textToLetterArray(text: string): Array<Letter> {
    const textArr = text.split("");
    return textArr.map(letter => ({content: letter, correct: false, typed: false}))
  }

  private letterArrayToHtml(letterArray: Array<Letter>): string {
    return letterArray.map(letter => {
      if (letter.typed === false) {
        return "<span>" + letter.content + "</span>";
      }else if (letter.correct) {
        return "<span class='correct'>" + letter.content + "</span>";
      }
      return "<span class='invalid'>" + letter.content + "</span>";
    }).join("");
  }
}
