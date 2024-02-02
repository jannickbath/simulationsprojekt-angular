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
  public fetchedText: string = "";
  public ranBotSetup: boolean = false;
  public ranSetup: boolean = false;
  public tickDelay$ = new BehaviorSubject<number>(this._defaultTickDelay);
  public tickEventEmitter = new EventEmitter<never>();

  get defaultTickDelay() {
    return this._defaultTickDelay;
  }

  get running() {
    return this._running;
  }

  get ticks() {
    return this._ticks;
  }

  constructor(private playerService: PlayerService, private popupService: PopupService, private itemService: ItemService) {
    this.tickDelay$.subscribe(delay => this.setupGameLoop(delay));
  }

  set running(value: boolean) {
    this._running = value;
  }

  /**
   * Calculates the progress (in %) based off the given cpm and passed game ticks.
   * @param cpm 
   */
  private calculateProgressFromCPM(cpm: number) {
    const totalCharacters = this.fetchedText.length;
    const secondsPassed = this._ticks;
    const minutesPassed = secondsPassed / 60;
    return ((minutesPassed * cpm) / totalCharacters) * 100;
  }

  /**
   * Shows winner popup and resets bot progress.
   * 
   * @param bot The winner bot
   */
  private handleWinnerBot(bot: Player) {
    if (this._winner) return;

    this._running = false;
    this.popupService.addPopup("Game Over!", "Player " + bot.name + " has won!");
    setTimeout(() => this.resetBotProgress(), 1000);
    this._winner = bot;
  }

  /**
   * Setup game loop.
   * Handles item activation and progress for bots.
   * 
   * @param delay The tick delay in ms
   */
  private setupGameLoop(delay: number) {
    if (this._interval) clearInterval(this._interval);

    this._interval = setInterval(() => {
      this.tickEventEmitter.emit();
      
      if (!this._running) {
        this.resetBotProgress();
        this._ticks = 0;
        return;
      }

      this._ticks++;

      this.playerService.bots.forEach(bot => {
        const items = this.itemService.getItemsFromTargetId(bot.id);
        if (bot.progress < 100) {
          const cpm = bot.baseSpeed + bot.speedModifier + Helper.getRandomNumberInRange(-50, 50);
          const calculatedProgress = this.calculateProgressFromCPM(cpm);

          if (calculatedProgress > bot.progress) {
            bot.progress = calculatedProgress;
          }

          const likelihood = (bot.progress / 100) / 3;
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

  /**
   * Resets bot progress. Clears winner, speedModifiers and items.
   */
  public resetBotProgress() {
    this.playerService.bots.forEach(bot => {
      bot.progress = 0;
    })
    this._winner = null;
    this.playerService.bots.forEach(bot => {
      bot.speedModifier = 0;
    });
    this.itemService.clearItems();
  }

  /**
   * Start the game.
   */
  public start() {
    this._running = true;
  }

  /**
   * Toggles the game state.
   */
  public toggle() {
    this._running = !this._running;
  }
}
