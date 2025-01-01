import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../service/web-socket.service';
import { MetalProduct } from '../../model/metal-product';
import { Subscription } from 'rxjs';
import { DetectionComponent } from '../detection/detection.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, DetectionComponent, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy{

  currentProduct: MetalProduct | null = null;
  isModalOpen: boolean = false;
  modalImage: string | null | undefined = null;

  openModal(imageSrc: string | undefined): void {
    this.modalImage = imageSrc;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalImage = null;
  }

  constructor(private wsService: WebSocketService) {

    this.wsService.metalProduct$.subscribe(
      (message) => {
        this.currentProduct = message
        console.log('currentProduct: ', this.currentProduct);
        // Mesajı işle
      },
      (error) => {
        console.error('Mesaj alma hatası:', error);
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
