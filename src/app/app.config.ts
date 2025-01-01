import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
//import { provideClientHydration } from '@angular/platform-browser';
import { WebSocketService } from './service/web-socket.service';
import { DetectionService } from './service/detection.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    WebSocketService,
    DetectionService, provideAnimationsAsync()
  ]
};
