import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarComponent } from '../car/car.component';
import { PlayerService } from '../../Services/player.service';
import { QuotableService } from '../../Services/quotable.service';
import { GameService } from '../../Services/game.service';

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
  @ViewChild("textLengthInput") textLengthInput!: ElementRef<HTMLInputElement>;
  @ViewChild("gameSetup") gameSetup!: ElementRef<HTMLDialogElement>;

  constructor(private playerService: PlayerService, private quotableService: QuotableService, private gameService: GameService) { }

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

  public handleGameSetupSubmit() {
    const maxTextLength = parseInt(this.textLengthInput.nativeElement.value);
    this.quotableService.maxTextLength = maxTextLength;
    this.gameService.ranSetup = true;
  }

  public handleGameSetupClose() {
    this.gameService.ranSetup = true;
  }

  public handleBotSetupClose() {
    this.gameService.ranBotSetup = true;
  }

  get bots() {
    return this.playerService.bots;
  }

  get botIndex() {
    return this.playerService.bots.length;
  }

  get ranSetup() {
    return this.gameService.ranSetup;
  }

  get ranBotSetup() {
    return this.gameService.ranBotSetup;
  }

  get maxTextLength() {
    return this.quotableService.maxTextLength;
  }
}
