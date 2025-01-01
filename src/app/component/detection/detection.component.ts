import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

export interface DetectionStatus {
  status: 'started' | 'running' | 'stopped' | 'error';
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-detection',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AlertComponent],
  templateUrl: './detection.component.html',
  styleUrl: './detection.component.css'
})
export class DetectionComponent implements OnInit, OnDestroy {

  status: 'stopped' | 'running' | 'error' = 'stopped';
  loading = false;
  takePhotoLoading = false;
  error: string | null = null;
  alertMessage = '';
  alertType: 'success' | 'warning' | 'error' = 'success';
  private statusSubscription?: Subscription;
  private pollSubscription?: Subscription;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.checkInitialStatus();
    //this.startStatusPolling();
  }

  ngOnDestroy() {
    this.statusSubscription?.unsubscribe();
    this.pollSubscription?.unsubscribe();
  }

  private startStatusPolling() {
    /*this.pollSubscription = interval(2000).subscribe(() => {
      this.checkInitialStatus();
    });*/
  }

  private checkInitialStatus() {
    this.http.get<any>(`${environment.flaskApiUrl}/detection/status`).subscribe({
      next: (status: DetectionStatus) => {
        this.handleStatusUpdate(status);
      },
      error: (error) => {
        console.error('Error checking status:', error);
        this.error = 'Durum kontrolü başarısız oldu';
      }
    });
  }

  startDetection() {
    this.loading = true;
    this.error = null;
    this.http.post<any>(`${environment.flaskApiUrl}/detection/start`, {}).subscribe({
      next: (response) => {
        if (response.success) {
          this.status = 'running';
          this.error = null;
        } else {
          this.error = 'Tarama başlatılamadı';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error starting detection:', error);
        this.error = 'Tarama başlatılırken hata oluştu';
        this.loading = false;
      }
    });
  }

  stopDetection() {
    this.loading = true;
    this.error = null;
    this.http.post<any>(`${environment.flaskApiUrl}/detection/stop`, {}).subscribe({
      next: (response) => {
        if (response.success) {
          this.status = 'stopped';
          this.error = null;
        } else {
          this.error = 'Tarama durdurulamadı';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error stopping detection:', error);
        this.error = 'Tarama durdurulurken hata oluştu';
        this.loading = false;
      }
    });
  }

  private handleStatusUpdate(status: DetectionStatus) {
    switch (status.status) {
      case 'started':
      case 'running':
        this.status = 'running';
        this.error = null;
        break;
      case 'stopped':
        this.status = 'stopped';
        this.error = null;
        break;
      case 'error':
        this.status = 'error';
        this.error = status.message;
        break;
    }
    this.loading = false;
  }

    capturePhoto() {
      this.takePhotoLoading = true;
  
      this.http.get(`${environment.flaskApiUrl}/detection/take_photo`)
        .subscribe({
          next: (response: any) => {
            this.showAlert("Fotoğraf başarıyla çekildi!", "success")
            this.takePhotoLoading = false; 
          },
          error: (error) => {
            this.showAlert("Fotoğraf çekilirken hata oluştu. " + error.message, 'error');
            this.takePhotoLoading = false;
          }
        });
    }

    showAlert(message: string, type: 'success' | 'warning' | 'error') {
      this.alertMessage = message;
      this.alertType = type;
  
      setTimeout(() => {
        this.alertMessage = '';
      }, 3000);
    }

}
