import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase'
})
export class TitlecasePipe implements PipeTransform {

  private prepositions = ["of", "the"];

  transform(value: string) {
    let words = value.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
      if (!this.prepositions.includes(words[i])) { // skip prepositions
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
    }

    return words.join(' ');
  }

}
