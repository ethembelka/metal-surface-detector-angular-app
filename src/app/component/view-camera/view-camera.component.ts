import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-camera',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './view-camera.component.html',
  styleUrl: './view-camera.component.css'
})
export class ViewCameraComponent implements OnInit {

  videoUrl = '';
  isPlaying = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  startVideo() {
    this.http.post(`${environment.flaskApiUrl}/detection/start_stream`, {}).subscribe({
      next: () => {
        this.isPlaying = true;
        this.videoUrl = `${environment.flaskApiUrl}/detection/stream`;
      },
      error: (error) => console.error('Stream başlatma hatası:', error)
    });
  }

  stopVideo() {
    this.http.post(`${environment.flaskApiUrl}/detection/stop_stream`, {}).subscribe({
      next: () => {
        this.isPlaying = false;
        this.videoUrl = '';
      },
      error: (error) => console.error('Stream durdurma hatası:', error)
    });
  }

}
