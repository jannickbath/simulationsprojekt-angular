import { Component, Input } from '@angular/core';
import { Player } from '../../Types';
import { GameService } from '../../Services/game.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {
  @Input({ required: true }) player !: Player;

  get carModel() {
    return this.player.human ? "brick" : "default";
  }

  get progress() {
    return this.player.progress + "%";
  }

  get transitionStyle() {
    const transitionTime = this.gameService.tickDelay$.value * 1.5;
    return `left ${transitionTime}ms linear`;
  }

  constructor(private gameService: GameService) {}
}
