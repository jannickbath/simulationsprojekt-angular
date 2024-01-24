import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validate',
  standalone: true
})
export class ValidatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
