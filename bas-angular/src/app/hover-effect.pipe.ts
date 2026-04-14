import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'hoverEffect'
})
export class HoverEffectPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  // transform(value: string, city: string, citycode: string): string {
  //   if(citycode === "NY")
  //     return "City Name : " + city

  //   return "City Name : " + citycode;
  // }

  transform(value: string, city: string): any {

    return this.sanitizer.bypassSecurityTrustHtml('<div style="background-color: #ffffcc">' + city + '</div>');
  }

}
