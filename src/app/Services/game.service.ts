import { EventEmitter, Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Helper } from '../Helper';
import { Player } from '../Types';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _running: boolean = false;
  private _winner: Player | null = null;
  public tickEventEmitter = new EventEmitter<never>();

  constructor(private playerService: PlayerService, private popupService: PopupService) {
    this.setupGameLoop();
  }

  private setupGameLoop() {
    setInterval(() => {
      this.tickEventEmitter.emit();
      if (!this._running) return;

      this.playerService.bots.forEach(bot => {
        if (bot.progress < 100) {
          bot.progress += Helper.getRandomNumberInRange(10, 30);
        }else {
          this.handleWinnerBot(bot);
        }
      })
    }, 1000);
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
}
