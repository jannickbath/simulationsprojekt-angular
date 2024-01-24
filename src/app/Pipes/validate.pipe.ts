import { Pipe, PipeTransform } from '@angular/core';
import { Letter } from '../Types';

@Pipe({
  name: 'convertToHtml',
  standalone: true
})
export class ValidatePipe implements PipeTransform {
  private _html: string = "";

  transform(letterArray: any): any {
    console.log(letterArray);
    // console.log(letterArray);
    // letterArray.forEach(letter => {
    //   if (letter.correct) {
    //     this._html += "<span>" + letter + "</span>";
    //   }else {
    //     this._html += "<span><strong>" + letter + "</strong></span>";
    //   }
    // })
    // return this._html;
  }

}
