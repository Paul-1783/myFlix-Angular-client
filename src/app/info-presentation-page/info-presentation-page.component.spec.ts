import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPresentationPageComponent } from './info-presentation-page.component';

describe('InfoPresentationPageComponent', () => {
  let component: InfoPresentationPageComponent;
  let fixture: ComponentFixture<InfoPresentationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPresentationPageComponent]
    });
    fixture = TestBed.createComponent(InfoPresentationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
