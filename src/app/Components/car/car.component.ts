import { Component, Input } from '@angular/core';
import { Player } from '../../Types';

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
}
