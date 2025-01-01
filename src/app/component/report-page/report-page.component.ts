import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../model/material.module';
import { MetalProduct } from '../../model/metal-product';
import { MetalProductFilter } from '../../model/metal-product-filter';
import { PageResponse } from '../../model/page-response';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { DefectDialogComponent } from '../defect-dialog/defect-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportPageComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/metal-products`;
  filterForm!: FormGroup;
  dataSource: MetalProduct[] = [];
  displayedColumns: string[] = ['name', 'originalImage', 'timestamp', 'defective', 'processedImage', 'defectCount', 'actions'];
  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  expandedElement: MetalProduct | null = null;
  
  defectTypes: string[] = ['hole', 'demilune'];

  constructor(
    private fb: FormBuilder,
    //private metalProductService: MetalProductService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    
  }

  openImageDialog(image: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: {
        image: 'data:image/jpeg;base64,' + image
      }
    });
  }

  openDefectDialog(product: MetalProduct): void {
    this.dialog.open(DefectDialogComponent, {
      data: product,
      width: '800px'
    });
  }

  expandElement(element: MetalProduct): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  formatCoordinates(coordinates: any): string {
    return `X: ${coordinates.x}, Y: ${coordinates.y}, W: ${coordinates.width}, H: ${coordinates.height}`;
  }

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

    filterMetalProducts(filter: MetalProductFilter): Observable<PageResponse<MetalProduct>> {
      return this.http.post<PageResponse<MetalProduct>>(`${this.apiUrl}/filter`, filter);
    }
  
    formatDate(date: Date): string | null {
      if (!date) return null;
      return date.toISOString().slice(0, 19); // "yyyy-MM-dd'T'HH:mm:ss" formatı
    }

  private createForm(): void {
    this.filterForm = this.fb.group({
      name: [''],
      defective: [null],
      defectType: [''],
      confidenceRate: [null],
      startDate: [null],
      endDate: [null],
      sortBy: ['timestamp'],
      sortDirection: ['desc']
    });

    
    this.filterForm.valueChanges.subscribe(() => {
      this.pageIndex = 0;
      this.loadData();
    });
  }
  

  loadData(): void {
    const startDateControl = this.filterForm.get('startDate');
    const endDateControl = this.filterForm.get('endDate');

    const filter: MetalProductFilter = {
      ...this.filterForm.value,
      page: this.pageIndex,
      size: this.pageSize,
      startDate: startDateControl ? this.formatDate(startDateControl.value) : null,
      endDate: endDateControl ? this.formatDate(endDateControl.value) : null
    };

    this.filterMetalProducts(filter)
      .subscribe((response: PageResponse<MetalProduct>) => {
        this.dataSource = response.content;
        //console.log(this.dataSource);
        this.totalElements = response.totalElements;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadData();
  }

  onSort(sort: Sort): void {
    this.filterForm.patchValue({
      sortBy: sort.active,
      sortDirection: sort.direction
    }, { emitEvent: true });
  }

  getDefectCount(product: MetalProduct): number {
    return product.defectDTOS?.length || 0;
  }

  viewDetails(product: MetalProduct): void {
  }
}
