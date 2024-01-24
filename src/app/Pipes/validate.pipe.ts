import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
  standalone: true
})

export class ValidatePipe implements PipeTransform {
  transform(length: number): Array<number> {
    return Array.from(Array(length),(_,i)=>i)
  }
}
