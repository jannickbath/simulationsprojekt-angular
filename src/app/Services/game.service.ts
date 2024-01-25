import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _running: boolean = false;

  public start() {
    this._running = true;
  }

  public stop() {
    this._running = false;
  }

  public toggle() {
    this._running = !this._running;
  }

  get running() {
    return this._running;
  }
}
