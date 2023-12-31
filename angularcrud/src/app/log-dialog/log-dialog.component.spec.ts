import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDialogComponent } from './log-dialog.component';

describe('LogDialogComponent', () => {
  let component: LogDialogComponent;
  let fixture: ComponentFixture<LogDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogDialogComponent]
    });
    fixture = TestBed.createComponent(LogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
