import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSectionTitleDirective } from './form-section-title.directive';
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  selector: 'app-mock-wrapper',
  template: `
  <div app-section-title>Title example</div>
  `
})
export class MockWrapperComponent {}

describe('FormSectionTitleComponent', () => {
  let component: MockWrapperComponent;
  let fixture: ComponentFixture<MockWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockWrapperComponent, FormSectionTitleDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the corresponding classes in the div', () => {
    const divTitle = fixture.debugElement.query(By.css('.mat-h3.form-section-title--margin'));
    expect(divTitle).toBeTruthy();
  });
});
