import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMb'
})
export class ToMbPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value=parseInt(value)/1000;
    return parseFloat(value).toFixed(2);
  }

}
