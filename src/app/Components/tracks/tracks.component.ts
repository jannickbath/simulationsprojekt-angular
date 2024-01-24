import { Component } from '@angular/core';
import { PlayerService } from '../../Services/player.service';
import { CommonModule } from '@angular/common';
import { ValidatePipe } from '../../Pipes/validate.pipe';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [CommonModule, ValidatePipe, CarComponent],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent {
  constructor(public playerService: PlayerService) {}
}
