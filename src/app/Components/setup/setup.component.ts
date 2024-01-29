import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarComponent } from '../car/car.component';
import { PlayerService } from '../../Services/player.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SetupComponent {
  @ViewChild("botWrapper") botWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild("addButton") addButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("botInput") botInput!: ElementRef<HTMLInputElement>;
  @ViewChild("botNameInput") botNameInput!: ElementRef<HTMLInputElement>;

  constructor(private playerService: PlayerService) { }

  private addBot(baseSpeed: number) {
    this.playerService.addPlayer(this.botNameInput.nativeElement.value, baseSpeed);
  }

  public handleConfirm() {
    this.addBot(parseInt(this.botInput.nativeElement.value));
    this.hideUtility()
  }

  public showUtility() {
    this.botWrapper.nativeElement.classList.add("active");
    this.addButton.nativeElement.classList.remove("active");
    this.botInput.nativeElement.focus();
  }

  public hideUtility() {
    this.botWrapper.nativeElement.classList.remove("active");
    this.addButton.nativeElement.classList.add("active");
    this.addButton.nativeElement.focus();
  }

  get bots() {
    return this.playerService.bots;
  }

  get botIndex() {
    return this.playerService.bots.length;
  }
}
