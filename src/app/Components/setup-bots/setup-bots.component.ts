import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarComponent } from '../car/car.component';
import { GameService } from '../../Services/game.service';
import { PlayerService } from '../../Services/player.service';

@Component({
  selector: 'app-setup-bots',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './setup-bots.component.html',
  styleUrl: './setup-bots.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SetupBotsComponent {
  @ViewChild("addButton") private addButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("botInput") private botInput!: ElementRef<HTMLInputElement>;
  @ViewChild("botNameInput") private botNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild("botWrapper") private botWrapper!: ElementRef<HTMLDivElement>;

  get botIndex() {
    return this.playerService.bots.length;
  }

  get bots() {
    return this.playerService.bots;
  }

  get ranBotSetup() {
    return this.gameService.ranBotSetup;
  }

  constructor(private gameService: GameService, private playerService: PlayerService) { }

  private addBot(baseSpeed: number) {
    this.playerService.addPlayer(this.botNameInput.nativeElement.value, baseSpeed);
  }

  public handleBotSetupClose() {
    this.gameService.ranBotSetup = true;
  }

  public handleConfirm() {
    this.addBot(parseInt(this.botInput.nativeElement.value));
    this.hideUtility()
  }

  public hideUtility() {
    this.botWrapper.nativeElement.classList.remove("active");
    this.addButton.nativeElement.classList.add("active");
    this.addButton.nativeElement.focus();
  }

  public removePlayer(id: number) {
    this.playerService.removePlayer(id);
  }

  public showUtility() {
    this.botWrapper.nativeElement.classList.add("active");
    this.addButton.nativeElement.classList.remove("active");
    this.botInput.nativeElement.focus();
  }
}
