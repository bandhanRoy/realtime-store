import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSideNavComponent } from './form-side-nav.component';

describe('FormSideNavComponent', () => {
  let component: FormSideNavComponent;
  let fixture: ComponentFixture<FormSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
