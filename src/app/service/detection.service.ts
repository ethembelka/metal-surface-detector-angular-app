import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface DetectionStatus {
  status: 'started' | 'running' | 'stopped' | 'error';
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class DetectionService {
  private statusSubject = new BehaviorSubject<DetectionStatus>({
    status: 'stopped',
    message: '',
    timestamp: new Date().toISOString()
  });

  detectionStatus$ = this.statusSubject.asObservable();

  constructor(private http: HttpClient) { }

  checkStatus(): Observable<DetectionStatus> {
    return this.http.get<DetectionStatus>(`${environment.flaskApiUrl}/detection/status`);
  }

  startDetection(): Observable<any> {
    return this.http.post<any>(`${environment.flaskApiUrl}/detection/start`, {});
  }

  stopDetection(): Observable<any> {
    return this.http.post<any>(`${environment.flaskApiUrl}/detection/stop`, {});
  }

  updateStatus(status: DetectionStatus) {
    this.statusSubject.next(status);
  }

}
