import { Component } from '@angular/core';
import { HeaderComponent } from './Components/header/header.component';
import { ControlsComponent } from './Components/controls/controls.component';
import { TracksComponent } from './Components/tracks/tracks.component';
import { PopupComponent } from './Components/popup/popup.component';
import { SetupComponent } from './Components/setup/setup.component';
import { UtilityComponent } from './Components/utility/utility.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ControlsComponent, TracksComponent, PopupComponent, SetupComponent, UtilityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simulationsprojekt';
}
