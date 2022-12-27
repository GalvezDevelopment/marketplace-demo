import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'div[app-section-title]'
})
export class FormSectionTitleDirective implements OnInit {
  constructor(private readonly el: ElementRef, private readonly render: Renderer2) {
  }

  ngOnInit() {
    this.el.nativeElement.classList.add('mat-h3');
    this.render.addClass(this.el.nativeElement, 'form-section-title--margin');
    this.render.setStyle(this.el.nativeElement, 'color', '#646464');
  }
}
