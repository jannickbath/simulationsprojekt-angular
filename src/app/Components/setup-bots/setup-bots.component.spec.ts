import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBotsComponent } from './setup-bots.component';

describe('SetupBotsComponent', () => {
  let component: SetupBotsComponent;
  let fixture: ComponentFixture<SetupBotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupBotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
