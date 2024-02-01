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

  public addItem(targetId: Item["targetId"], type: Item["type"], position: Item["position"]) {
    const id = this._items.length + 1;
    this._items.push({ id: id, targetId: targetId, type: type, position: position });
  }

  public getItemsFromTargetId(targetId: Item["targetId"]): Array<Item> {
    return this._items.filter(item => item.targetId === targetId);
  }

  public removeItem(id: Item["id"]) {
    this._items = this._items.filter(item => item.id !== id);
  }

  public clearItems() {
    this._items = [];
  }
}
