import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../Services/game.service';

@Component({
  selector: 'app-open-setup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-setup.component.html',
  styleUrl: './open-setup.component.scss'
})
export class OpenSetupComponent {
  constructor(private gameService: GameService) { }

  public toggleSetup() {
    this.gameService.ranSetup = !this.gameService.ranSetup;
  }
}
