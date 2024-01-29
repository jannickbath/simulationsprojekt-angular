import { EventEmitter, Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Helper } from '../Helper';
import { Player } from '../Types';
import { PopupService } from './popup.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _running: boolean = false;
  private _winner: Player | null = null;
  private _interval: any;
  private _defaultTickDelay: number = 1000;
  public tickDelay$ = new BehaviorSubject<number>(this._defaultTickDelay);
  public tickEventEmitter = new EventEmitter<never>();

  constructor(private playerService: PlayerService, private popupService: PopupService) {
    this.tickDelay$.subscribe(delay => this.setupGameLoop(delay));
  }

  private setupGameLoop(delay: number) {
    if (this._interval) clearInterval(this._interval);

    this._interval = setInterval(() => {
      this.tickEventEmitter.emit();
      if (!this._running) return;

      this.playerService.bots.forEach(bot => {
        if (bot.progress < 100) {
          bot.progress += bot.baseSpeed + Helper.getRandomNumberInRange(-10, 10);
        }else {
          this.handleWinnerBot(bot);
        }
      })
    }, delay);
  }

  private handleWinnerBot(bot: Player) {
    if (this._winner) return;

    this.stop();
    this.popupService.addPopup("Game Over!", "Player " + bot.name + " has won!");
    setTimeout(() => this.resetBotProgress(), 1000);
    this._winner = bot;
  }

  public resetBotProgress() {
    this.playerService.bots.forEach(bot => {
      bot.progress = 0;
    })
    this._winner = null;
  }

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

  get defaultTickDelay() {
    return this._defaultTickDelay;
  }
}
