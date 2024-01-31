import { Component } from '@angular/core';
import { PopupService } from '../../Services/popup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})

export class PopupComponent {
  public clearPopups = () => this.popupService.clearPopups();

  public get popups() {
    return [...this.popupService.popups].reverse();
  }

  public removePopup = (id: number) => this.popupService.removePopup(id);

  constructor(protected popupService: PopupService) { }
}
