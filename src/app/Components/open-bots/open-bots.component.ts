import { Component } from '@angular/core';
import { GameService } from '../../Services/game.service';

@Component({
  selector: 'app-open-bots',
  standalone: true,
  imports: [],
  templateUrl: './open-bots.component.html',
  styleUrl: './open-bots.component.scss'
})
export class OpenBotsComponent {
  constructor(private gameService: GameService) { }

  public toggleBotSetup() {
    this.gameService.ranBotSetup = !this.gameService.ranBotSetup;
  }
}
