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
  private _defaultTickDelay: number = 1000;
  private _interval: any;
  private _running: boolean = false;
  private _ticks: number = 0;
  private _winner: Player | null = null;

  get defaultTickDelay() {
    return this._defaultTickDelay;
  }

  public fetchedText: string = "";
  public ranBotSetup: boolean = false;
  public ranSetup: boolean = false;

  get running() {
    return this._running;
  }

  public tickDelay$ = new BehaviorSubject<number>(this._defaultTickDelay);
  public tickEventEmitter = new EventEmitter<never>();

  get ticks() {
    return this._ticks;
  }

  constructor(private playerService: PlayerService, private popupService: PopupService, private itemService: ItemService) {
    this.tickDelay$.subscribe(delay => this.setupGameLoop(delay));
  }

  private calculateProgressFromCPM(cpm: number) {
    const totalCharacters = this.fetchedText.length;
    const secondsPassed = this._ticks;
    const minutesPassed = secondsPassed / 60;
    return ((minutesPassed * cpm) / totalCharacters) * 100;
  }

  private handleWinnerBot(bot: Player) {
    if (this._winner) return;

    this.stop();
    this.popupService.addPopup("Game Over!", "Player " + bot.name + " has won!");
    setTimeout(() => this.resetBotProgress(), 1000);
    this._winner = bot;
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
          const cpm = bot.baseSpeed + bot.speedModifier + Helper.getRandomNumberInRange(-50, 50);
          const calculatedProgress = this.calculateProgressFromCPM(cpm);

          if (calculatedProgress > bot.progress) {
            bot.progress = calculatedProgress;
          }

          const likelihood = (bot.progress / 100) / 2;
          if (Helper.randomBooleanWithLikelihood(likelihood)) {
            this.itemService.addItem(bot.id, "barrier", bot.progress + 5);
          }

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
    this.playerService.bots.forEach(bot => {
      bot.speedModifier = 0;
    });
    this.itemService.clearItems();
  }

  public toggle() {
    this._running = !this._running;
  }
}
