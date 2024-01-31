import { Injectable } from '@angular/core';
import { Popup } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private _popups: Array<Popup> = [];

  public get popups() {
    return this._popups;
  }

  public addPopup(headline: string, description: string) {
    const id = this._popups.length + 1;
    this._popups.push({id: id, headline: headline, description: description});
  }

  public clearPopups() {
    this._popups = [];
  }

  public removePopup(id: number) {
    this._popups = this._popups.filter(popup => popup.id !== id);
  }
}
