import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassagesHistoryComponent } from './massages-history.component';

describe('MassagesHistoryComponent', () => {
  let component: MassagesHistoryComponent;
  let fixture: ComponentFixture<MassagesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassagesHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassagesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
