import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSetupComponent } from './open-setup.component';

describe('OpenSetupComponent', () => {
  let component: OpenSetupComponent;
  let fixture: ComponentFixture<OpenSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
