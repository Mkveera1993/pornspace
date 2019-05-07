import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMin'
})
export class ToMinPipe implements PipeTransform {

  transform(sec: any, args?: any): any {
    var hours: any = Math.floor(parseInt(sec) / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min: any = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : "00";

    min.toString().length == 1 ? (min = "0" + min) : "00";
    sec.toString().length == 1 ? (sec = "0" + sec) : "00";
    return hours + ":" + min + ":" + sec;    
  }

}
