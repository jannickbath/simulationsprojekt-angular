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

  /**
   * Creates a popup object and shows it to the user.
   * 
   * @param headline Descriptive headline to tell the user what the popup is about
   * @param description Further description of what you're trying to tell the user
   */
  public addPopup(headline: string, description: string) {
    const id = this._popups.length + 1;
    this._popups.push({id: id, headline: headline, description: description});
  }

  /**
   * Removes all popups.
   */
  public clearPopups() {
    this._popups = [];
  }

  /**
   * Removes a popup given it's id.
   * 
   * @param id Id of the popup to be removed
   */
  public removePopup(id: number) {
    this._popups = this._popups.filter(popup => popup.id !== id);
  }
}
