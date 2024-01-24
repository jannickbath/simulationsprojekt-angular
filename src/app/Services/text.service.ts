import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  text: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";

  constructor() { }
}
