import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChantierComponent } from './single-chantier.component';

describe('SingleChantierComponent', () => {
  let component: SingleChantierComponent;
  let fixture: ComponentFixture<SingleChantierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChantierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
