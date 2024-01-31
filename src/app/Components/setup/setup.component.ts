import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarComponent } from '../car/car.component';
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
  @ViewChild("textLengthInput") private textLengthInput!: ElementRef<HTMLInputElement>;

  get maxTextLength() {
    return this.quotableService.maxTextLength;
  }

  get ranSetup() {
    return this.gameService.ranSetup;
  }

  constructor(private quotableService: QuotableService, private gameService: GameService) { }

  public handleGameSetupClose() {
    this.gameService.ranSetup = true;
  }

  public handleGameSetupSubmit() {
    const maxTextLength = parseInt(this.textLengthInput.nativeElement.value);
    this.quotableService.maxTextLength = maxTextLength;
    this.gameService.ranSetup = true;
  }
}
