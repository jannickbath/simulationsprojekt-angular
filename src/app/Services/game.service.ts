import { EventEmitter, Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Helper } from '../Helper';
import { Player } from '../Types';
import { PopupService } from './popup.service';
import { BehaviorSubject } from 'rxjs';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _running: boolean = false;
  private _winner: Player | null = null;
  private _interval: any;
  private _defaultTickDelay: number = 1000;
  private _ticks: number = 0;
  public tickDelay$ = new BehaviorSubject<number>(this._defaultTickDelay);
  public ranSetup: boolean = false;
  public ranBotSetup: boolean = false;
  public fetchedText: string = "";
  public tickEventEmitter = new EventEmitter<never>();

  constructor(private playerService: PlayerService, private popupService: PopupService, private itemService: ItemService) {
    this.tickDelay$.subscribe(delay => this.setupGameLoop(delay));
  }

  private setupGameLoop(delay: number) {
    if (this._interval) clearInterval(this._interval);

    this._interval = setInterval(() => {
      this.tickEventEmitter.emit();
      if (!this._running) return;
      this._ticks++;

      this.playerService.bots.forEach(bot => {
        const items = this.itemService.getItemsFromTargetId(bot.id);
        if (bot.progress < 100) {
          const cpm = bot.baseSpeed + Helper.getRandomNumberInRange(-50, 50);
          bot.progress = this.calculateProgressFromCPM(cpm);

          items.forEach(item => {
            if (bot.progress >= item.position) {
              this.itemService.activateItem(item.id);
            }
          })
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
  
  private calculateProgressFromCPM(cpm: number) {
    const totalCharacters = this.fetchedText.length;
    const secondsPassed = this._ticks;
    const minutesPassed = secondsPassed / 60;
    return ((minutesPassed * cpm) / totalCharacters) * 100;
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
    this._ticks = 0;
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

  get ticks() {
    return this._ticks;
  }
}
