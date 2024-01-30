import { Component } from '@angular/core';
import { OpenSetupComponent } from '../open-setup/open-setup.component';
import { OpenBotsComponent } from '../open-bots/open-bots.component';

@Component({
  selector: 'app-utility',
  standalone: true,
  imports: [OpenSetupComponent, OpenBotsComponent],
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss'
})
export class UtilityComponent {

}
