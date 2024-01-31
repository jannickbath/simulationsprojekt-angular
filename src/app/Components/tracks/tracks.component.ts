import { Component } from '@angular/core';
import { PlayerService } from '../../Services/player.service';
import { CommonModule } from '@angular/common';
import { ValidatePipe } from '../../Pipes/validate.pipe';
import { CarComponent } from '../car/car.component';
import { ItemService } from '../../Services/item.service';
import { Item } from '../../Types';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [CommonModule, ValidatePipe, CarComponent],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent {
  get items() {
    return this.itemService.items;
  }

  constructor(public playerService: PlayerService, private itemService: ItemService) { }

  public getItemsFromTargetId(targetId: Item["targetId"]) {
    return this.itemService.getItemsFromTargetId(targetId);
  }
}
