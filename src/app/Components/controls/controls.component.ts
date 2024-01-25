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
  constructor(public gameService: GameService, public playerService: PlayerService) {}

  public addBot() {
    const botCount = this.bots.length;
    this.playerService.addPlayer("Bot " + (botCount + 1));
  }

  get running() {
    return this.gameService.running;
  }

  get bots() {
    return this.playerService.bots;
  }
}
