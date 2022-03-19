import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase'
})
export class TitlecasePipe implements PipeTransform {

  private prepositions = [
    'of',
    'the'
  ];

  transform(value: string): any {
    if(!value) return null;

    let words = value.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (i > 0 && this.isPreposition(word)) // when a preposition is the first word (i=0), it should still be titlecased
        words[i] = word.toLowerCase();
      else
        words[i] = this.toTitleCase(word);
    }
    
    return words.join(' ')
  }

  private toTitleCase(word: string): string {
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
  }

  private isPreposition(word: string): boolean {
    return this.prepositions.includes(word);
  }

}
