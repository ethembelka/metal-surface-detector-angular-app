import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectDialogComponent } from './defect-dialog.component';

describe('DefectDialogComponent', () => {
  let component: DefectDialogComponent;
  let fixture: ComponentFixture<DefectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
