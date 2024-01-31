import { Injectable } from '@angular/core';
import { Item } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _items: Array<Item> = [];

  constructor() {
    this.addItem(2, "barrier", 50);
    this.addItem(2, "barrier", 75);
  }

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

  get items() {
    return this._items;
  }
}
