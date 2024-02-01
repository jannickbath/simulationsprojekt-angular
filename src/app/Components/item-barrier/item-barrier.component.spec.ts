import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBarrierComponent } from './item-barrier.component';

describe('ItemBarrierComponent', () => {
  let component: ItemBarrierComponent;
  let fixture: ComponentFixture<ItemBarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemBarrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemBarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
