import { Injectable } from '@angular/core';
import { Item } from '../Types';
import { PlayerService } from './player.service';
import { Helper } from '../Helper';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _items: Array<Item> = [];

  get items() {
    return this._items;
  }

  constructor(private playerService: PlayerService) { }

  /**
   * Handles activation of an item based on it's type.
   * 
   * The item is removed after activation.
   * 
   * @param id Id of the item to be activated.
   */
  public activateItem(id: Item["id"]) {
    const item = this._items.find(item => item.id === id);
    if (item) {
      const player = this.playerService.players.find(player => player.id === item.targetId);

      if (player) {
        if (item.type === "barrier") {
          player.speedModifier -= Helper.getRandomNumberInRange(35, 75);
          this.removeItem(id);
        }
      }
    }
  }

  /**
   * Adds an item on the track of the targeted player.
   * 
   * @param targetId Id of receiving player
   * @param type
   * @param position Absolute position (in %) from the left side of the track
   */
  public addItem(targetId: Item["targetId"], type: Item["type"], position: Item["position"]) {
    const id = this._items.length + 1;
    this._items.push({ id: id, targetId: targetId, type: type, position: position });
  }

  /**
   * Fetches items based on the given targetId.
   * 
   * @param targetId Id of receiving player
   * @returns Array of items associated with the targetId
   */
  public getItemsFromTargetId(targetId: Item["targetId"]): Array<Item> {
    return this._items.filter(item => item.targetId === targetId);
  }

  /**
   * Removes an item given it's id.
   * 
   * @param id Id of the item to be removed
   */
  public removeItem(id: Item["id"]) {
    this._items = this._items.filter(item => item.id !== id);
  }

  /**
   * Removes all items.
   */
  public clearItems() {
    this._items = [];
  }
}
