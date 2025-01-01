import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetalProduct } from '../model/metal-product';
import { MetalProductFilter } from '../model/metal-product-filter';
import { PageResponse } from '../model/page-response';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MetalProductService {
  private apiUrl = `${environment.apiUrl}/metal-products`;

  constructor(private http: HttpClient) {}

  filterMetalProducts(filter: MetalProductFilter): Observable<PageResponse<MetalProduct>> {
    return this.http.post<PageResponse<MetalProduct>>(`${this.apiUrl}/filter`, filter);
  }

  // Tarih formatını backend'in beklediği formata çeviren yardımcı metod
  formatDate(date: Date): string | null {
    if (!date) return null;
    return date.toISOString().slice(0, 19); // "yyyy-MM-dd'T'HH:mm:ss" formatı
  }

}
