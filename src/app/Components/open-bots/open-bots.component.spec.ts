import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBotsComponent } from './open-bots.component';

describe('OpenBotsComponent', () => {
  let component: OpenBotsComponent;
  let fixture: ComponentFixture<OpenBotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenBotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
