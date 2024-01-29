import { Component } from '@angular/core';
import { GameService } from '../../Services/game.service';
import { PlayerService } from '../../Services/player.service';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {
  private _gameTicks: number = 0;

  constructor(public gameService: GameService, public playerService: PlayerService) {
    this.gameService.tickEventEmitter.subscribe(() => this.handleGameTick())
  }

  private handleGameTick() {
    if (this.gameService.running) {
      this._gameTicks++;
    }else if (this._gameTicks !== 0) {
      this._gameTicks = 0;
    }
  }

  public setTickDelay(multiplier: string) {
    const defaultTickDelay = this.gameService.defaultTickDelay;
    const tickDelay$ = this.gameService.tickDelay$;
    tickDelay$.next(defaultTickDelay * parseFloat(multiplier));
  }

  get running() {
    return this.gameService.running;
  }

  get bots() {
    return this.playerService.bots;
  }

  get gameTicks() {
    return this._gameTicks;
  }
}
