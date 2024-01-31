import { Injectable } from '@angular/core';
import { Item } from '../Types';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _items: Array<Item> = [];

  constructor(private playerService: PlayerService) { }

  public addItem(targetId: Item["targetId"], type: Item["type"], position: Item["position"]) {
    const id = this._items.length + 1;
    this._items.push({ id: id, targetId: targetId, type: type, position: position });
  }

  public removeItem(id: Item["id"]) {
    this._items = this._items.filter(item => item.id !== id);
  }

  public getItemsFromTargetId(targetId: Item["targetId"]): Array<Item> {
    return this._items.filter(item => item.targetId === targetId);
  }

  public activateItem(id: Item["id"]) {
    const item = this._items.find(item => item.id === id);
    if (item) {
      const player = this.playerService.players.find(player => player.id === item.targetId);

      if (player) {
        if (item.type === "barrier") {
          player.speedModifier -= 35;
          this.removeItem(id);
        }
      }
    }
  }

  get items() {
    return this._items;
  }
}
