import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../model/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetalProduct } from '../../model/metal-product';
import { Defect } from '../../model/defect';

@Component({
  selector: 'app-defect-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './defect-dialog.component.html',
  styleUrl: './defect-dialog.component.css'
})
export class DefectDialogComponent {
  defectColumns = ['defectType', 'confidenceRate', 'coordinates'];
  defectDataSource: Defect[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<DefectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetalProduct
  ) {
    this.defectDataSource = data.defectDTOS || [];
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
