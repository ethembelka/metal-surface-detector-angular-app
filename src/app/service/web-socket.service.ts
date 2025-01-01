import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { MetalProduct } from '../model/metal-product';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | null = null;
  private metalProductSubject = new Subject<MetalProduct>();


  public metalProduct$ = this.metalProductSubject.asObservable();

  constructor() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    if (this.stompClient) {
      this.disconnect();
    }

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${environment.wsUrl}/ws`),
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket Bağlantısı Başarılı');

      if (this.stompClient) {
        // Topic'e subscribe olma
        this.stompClient.subscribe('/topic/metal-products', (message) => {
          try {
            const metalProduct = JSON.parse(message.body);
            metalProduct.originalImage = "data:image/jpeg;base64," + metalProduct.originalImage;
            metalProduct.processedImage = "data:image/jpeg;base64," + metalProduct.processedImage;
            this.metalProductSubject.next(metalProduct);
          } catch (error) {
            console.error('Metal ürün mesaj işleme hatası: ', error);
          }
        });

      }
    };

    this.stompClient.onStompError = (error) => {
      console.error('STOMP hatası:', error);
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('WebSocket hatası:', error);
    };

    this.stompClient.activate();
  }

  private _arrayBufferToBase64(buffer: number[] | string): string {
    if (typeof buffer === 'string') {
      if (buffer.startsWith('data:image')) {
        return buffer;
      }
      return buffer;
    }

    const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return btoa(binary);
  }

  public disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate()
        .then(() => console.log('WebSocket bağlantısı kapatıldı'))
        .catch(error => console.error('Bağlantı kapatma hatası:', error));
    }
  }

  public reconnect() {
    this.disconnect();
    this.initializeWebSocketConnection();
  }

  public sendMessage(destination: string, message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(message)
      });
    } else {
      console.error('WebSocket bağlantısı mevcut değil');
    }
  }

  public ngOnDestroy() {
    this.disconnect();
  }
}