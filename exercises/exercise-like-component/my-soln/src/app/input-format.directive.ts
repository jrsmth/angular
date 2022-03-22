import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  constructor(private el: ElementRef) { }

  @Input('format') format = 'lowercase';

  @HostListener('blur') onBlur() {
    let value: string = this.el.nativeElement.value;

    if(this.format == 'lowercase') 
      this.el.nativeElement.value = value.toLowerCase();
    else if(this.format == 'uppercase')
      this.el.nativeElement.value = value.toUpperCase();
  }

}
