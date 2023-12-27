import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidationMessageComponent } from './input-validation-message.component';

describe('InputValidationMessageComponent', () => {
  let component: InputValidationMessageComponent;
  let fixture: ComponentFixture<InputValidationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputValidationMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
