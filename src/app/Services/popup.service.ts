import { Injectable } from '@angular/core';
import { Popup } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private _popups: Array<Popup> = [
    {
      id: 1,
      headline: "Lorem",
      description: "Lorem ipsum sit dolor amet."
    },
    {
      id: 2,
      headline: "Lorem 2",
      description: "Lorem ipsum sit dolor amet. 2"
    }
  ];

  public get popups() {
    return this._popups;
  }

  public addPopup(popup: Popup) {
    this._popups.push(popup);
  }

  public removePopup(id: number) {
    this._popups = this._popups.filter(popup => popup.id !== id);
  }

  public clearPopups() {
    this._popups = [];
  }
}
