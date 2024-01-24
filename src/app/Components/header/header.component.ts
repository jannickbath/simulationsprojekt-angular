import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { TextboxComponent } from '../textbox/textbox.component';
import { TargetComponent } from '../target/target.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ItemComponent, TextboxComponent, TargetComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
