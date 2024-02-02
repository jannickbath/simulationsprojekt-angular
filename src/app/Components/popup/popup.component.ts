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
  public get popups() {
    return [...this.popupService.popups].reverse();
  }

  constructor(protected popupService: PopupService) { }

  public clearPopups = () => this.popupService.clearPopups();

  public removePopup = (id: number) => this.popupService.removePopup(id);
}
