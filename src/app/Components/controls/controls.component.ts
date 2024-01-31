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
  get bots() {
    return this.playerService.bots;
  }

  get gameTicks() {
    return this.gameService.ticks;
  }

  get passedTime() {
    return this.gameService.ticks * this.gameService.tickDelay$.value;
  }

  get running() {
    return this.gameService.running;
  }

  constructor(public gameService: GameService, public playerService: PlayerService) { }

  public setTickDelay(multiplier: string) {
    const defaultTickDelay = this.gameService.defaultTickDelay;
    const tickDelay$ = this.gameService.tickDelay$;
    tickDelay$.next(defaultTickDelay * parseFloat(multiplier));
  }
}
